/******************************************************************************************************************
 * Google Sign-In → Firebase Authentication.
 *
 * Prerequisites:
 * - Provide the Google web OAuth client ID (from Firebase) via .env → GOOGLE_WEB_CLIENT_ID.
 * - Get this ID from Firebase > Authentication > Sign-in method > Sign-in providers > Google.
 *
 * Mental model (how it works):
 * - Google Sign-In returns an **ID token** (OIDC JWT) for the chosen Google account.
 * - We send that ID token to Firebase Auth to **sign in** (or create) the Firebase account for this project.
 * - The Firebase SDK manages the session (issues/refreshes Firebase ID tokens automatically).
 * - The current Firebase user (or null) is exposed via context.
 *
 * Notes:
 * - The Firebase account has a stable **uid** (user id in this project).
 * - For “anonymous → Google” upgrades that keep the same uid, we **link** Google to the current anonymous user.
 * - Anonymous accounts will get orphaned when it is signed out inadvertently, need to be cleaned up on Firebase end.
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  signOut as fbSignOut,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  configureGoogleSignIn,
  ensureAnonymousSession,
  ensureAccountPicker,
  startAuthObservers,
  verifyCurrentUser,
} from './FirebaseAuthHelpers';
import { withTimeout, doErrLog } from '../../Util/General';

/******************************************************************************************************************
 * Context shape.
 ******************************************************************************************************************/
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => doErrLog('auth', 'AuthContext', 'AuthProvider not mounted'),
  signOut: async () => doErrLog('auth', 'AuthContext', 'AuthProvider not mounted'),
});

type Props = { children: React.ReactNode; };

/******************************************************************************************************************
 * Singleton auth provider that surfaces Firebase Authentication state and Google Sign-In flows to the app.
 *
 * @property user     - Current Firebase user or null
 * @property signIn   - Launch Google Sign-In and authenticate with Firebase, linking anon → Google when possible
 * @property signOut  - Sign out from Firebase & Google, then ensure an anonymous session
 *
 * @param props - Provider props:
 *   - children - Subtree that consumes the auth context
 *
 * @usage
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 ******************************************************************************************************************/
export const AuthProvider: React.FC<Props> = ({ children }) => {
  // current Firebase user (null when signed out)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // guards
  const startedRef = useRef(false);
  const signingRef = useRef(false);
  const signingOutRef = useRef(false);

  /****************************************************************************************************************
   * Setup.
   ****************************************************************************************************************/
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    /** 1) Seed immediately so downstream can reflect an existing session (if any) **/
    const auth = getAuth(getApp());
    setUser(auth.currentUser ?? null);

    /** 2) Subscribe to observers immediately **/
    const stop = startAuthObservers({
      onUser: setUser,    // ensure user is always updated for downstream
      onInvalidation: async () => {
        // account invalidation on Firebase side; sign out locally
        if (!signingOutRef.current) {
          await signOut();
        }
      },
    });

    (async () => {
      try {
        /** 3) Configure Google Sign-In once **/
        await configureGoogleSignIn();
        /** 4) Ensure an anonymous session exists early (local-first) if no existing session **/
        await ensureAnonymousSession();
      } catch (e) {
        // non-fatal startup errors are okay; observers still keep state
      }
    })();

    return stop;
  }, []);

  /****************************************************************************************************************
   * [ASYNC] Perform Google Sign-In and authenticate with Firebase, linking anonymous users when possible.
   *
   * @throws {Error} any uncaught internal error during sign-in
   *
   * @usage
   * ```ts
   * await signIn()
   * ```
   ****************************************************************************************************************/
  const signIn = async (): Promise<void> => {
    if (signingRef.current) {
      doErrLog('auth', 'signIn', 'Sign-in already in progress');
      return;
    }
    signingRef.current = true;

    try {
      /** 1) Ensure Play Services on Android **/
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      }
      await ensureAccountPicker();

      /** 2) Launch Google account picker and fetch ID token (bounded to avoid silent hangs) **/
      const res: any = await withTimeout(GoogleSignin.signIn(), 30000, 'Google sign-in timeout');
      const idToken = res?.idToken ?? res?.data?.idToken;
      if (!idToken) {
        doErrLog('auth', 'signIn', 'Google sign-in failed: missing idToken');
        return;
      }

      /** 3) Link-or-sign-in with Google credential **/
      const auth = getAuth(getApp());
      const credential = GoogleAuthProvider.credential(idToken);

      /** 4) Anonymous → try to LINK first **/
      let isGoogleLoggedIn = false;
      if (auth.currentUser?.isAnonymous) {
        try {
          await linkWithCredential(auth.currentUser, credential); // retain uid
          isGoogleLoggedIn = true;
        } catch (e: any) {
          /** 4a) Non-linkage error when trying to link **/
          const raw = (e?.code ?? e?.nativeErrorCode ?? '').toString().toLowerCase();
          const alreadyLinked = raw.includes('credential-already-in-use');
          const differentCred = raw.includes('account-exists-with-different-credential');
          if (!alreadyLinked && !differentCred) throw e;
        }
      }

      /** 4b) Google account picked is already linked, sign in with that account instead **/
      if (!isGoogleLoggedIn) {
        try {
          await signInWithCredential(auth, credential);
        } catch (e) {
          throw e;
        }
      }

      /** 5) Do invalidation check, if exists sign out **/
      if (!(await verifyCurrentUser())) {
        await signOut();
        doErrLog('auth', 'signIn', 'Invalid user after sign-in, signed out');
        return;
      }

      /** 6) Force refresh of user context **/
      const refreshed = getAuth(getApp()).currentUser;
      if (refreshed) {
        setUser(refreshed);
      }
    } catch(e) {
      doErrLog('auth', 'signIn', `Undefined error: ${e}`);
    } finally {
      signingRef.current = false;
    }
  };

  /****************************************************************************************************************
   * [ASYNC] Sign out from Firebase and Google, then guarantee a fresh anonymous local-only session.
   *
   * @throws {Error} any uncaught internal error during sign-out
   *
   * @usage
   * ```ts
   * await signOut()
   * ```
   ****************************************************************************************************************/
  const signOut = async (): Promise<void> => {
    if (signingOutRef.current) return;
    signingOutRef.current = true;

    const auth = getAuth(getApp());
    try {
      /** 1) Do Firebase and Google sign out **/
      try { await fbSignOut(auth); } catch {}
      try { await GoogleSignin.signOut(); } catch {}
    } finally {
      /** 2) Ensure anonymous session **/
      await ensureAnonymousSession();
       /** 3) Force refresh of user context **/
      const refreshed = getAuth(getApp()).currentUser;
      if (refreshed) {
        setUser(refreshed);
      }
      signingOutRef.current = false;
    }
  };

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
