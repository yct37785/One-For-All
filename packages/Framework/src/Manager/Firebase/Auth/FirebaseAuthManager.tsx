import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInWithCredential,
  linkWithCredential,
  FirebaseAuthTypes,
  signOut as fbSignOut,
} from '@react-native-firebase/auth';
import { startAuthObservers, verifyCurrentUser } from './FirebaseAuthHelpers';
import { configureGoogleSignIn, signInGoogle, signOutGoogle } from './GoogleAuth';
import { doErrLog } from '../../../Util/General';

/******************************************************************************************************************
 * User provider.
 ******************************************************************************************************************/
export enum ProviderIdType {
  None = 'none',
  Google = 'google.com',
  Facebook = 'facebook.com',
};

/******************************************************************************************************************
 * Context shape.
 * 
 * @property user     - Current Firebase user or null
 * @property signIn   - Launch sign-in and authenticate with Firebase (optionally link if already signed in)
 * @property signOut  - Sign out from Firebase & Google
 ******************************************************************************************************************/
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  signIn: (providerIdType: ProviderIdType) => Promise<void>;
  signOut: () => Promise<void>;
};

/******************************************************************************************************************
 * Default (safe) context value.
 ******************************************************************************************************************/
const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => doErrLog('auth', 'AuthContext', 'AuthProvider not mounted'),
  signOut: async () => doErrLog('auth', 'AuthContext', 'AuthProvider not mounted'),
});

/******************************************************************************************************************
 * Singleton auth provider that surfaces Firebase Authentication state and Google Sign-In flows to the app.
 *
 * @usage
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 ******************************************************************************************************************/
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // guards
  const startedRef = useRef(false);
  const signingRef = useRef(false);
  const signingOutRef = useRef(false);

  /****************************************************************************************************************
   * On startup:
   * - seed user
   * - sub to observers (user update, user invalidation)
   ****************************************************************************************************************/
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    /**
     * 1) Seed immediately so downstream can reflect an existing session (if any)
     */
    const auth = getAuth(getApp());
    const seeded = auth.currentUser ?? null;
    setUser(seeded);

    /**
     * 2) Sub to observers
     */
    const stop = startAuthObservers({
      onUser: setUser,    // ensure user is always updated for downstream
      onInvalidation: async () => {
        // account invalidation on Firebase side = sign out locally
        await signOut();
      },
    });

    /**
     * 3) Configure Google Sign-In once
     */
    configureGoogleSignIn();

    return stop;
  }, []);

  /****************************************************************************************************************
   * [ASYNC] Perform sign-in with given provider and authenticate with Firebase.
   * 
   * @param providerType - Auth provider type
   *
   * @throws {Error} any uncaught internal error during sign-in
   * 
   * @usage
   * ```ts
   * await signIn()
   * ```
   ****************************************************************************************************************/
  const signIn = async (providerType: ProviderIdType): Promise<void> => {
    if (!signingRef.current) {
      signingOutRef.current = true;

      try {
        /**
         * 1) Create Firebase cred
         */
        const auth = getAuth(getApp());
        let cred = null;

        if (providerType === ProviderIdType.Google) {
          cred = await signInGoogle();
        }
        else if (providerType === ProviderIdType.Facebook) {
          // future: Facebook sign in
        }
        else {
          throw new Error('Unrecognized provider');
        }

        /**
         * 2) Do sign-in
         */
        if (cred) {
          /** a) Existing acc logged in (UID), we link this cred and sign in */
          if (auth.currentUser) {
            await linkWithCredential(auth.currentUser, cred);
          }
          /** b) Not logged in, we create a new acc (UID), link this cred and sign in */
          else {
            await signInWithCredential(auth, cred);
          }
        }

        /**
         * 3) Invalidation check
         */
        if (!(await verifyCurrentUser())) {
          await signOut();
          doErrLog('auth', 'signIn', 'Invalid user after sign-in, signed out');
          return;
        }

        /**
         * 4) Force refresh of user context
         */
        const updatedUser = getAuth(getApp()).currentUser ?? null;
        if (!updatedUser) {
          throw Error('updatedUser still null');
        }
        setUser(updatedUser);
        
      } catch (e) {
        doErrLog('auth', 'signIn', `${e}`);
      } finally {
        signingRef.current = false;
      }
    }
  };

  /****************************************************************************************************************
   * [ASYNC] Perform sign-out from current provider and Firebase.
   *
   * @throws {Error} any uncaught internal error during sign-out
   *
   * @usage
   * ```ts
   * await signOut()
   * ```
   ****************************************************************************************************************/
  const signOut = async (): Promise<void> => {
    if (!signingOutRef.current) {
      signingOutRef.current = true;

      try {
        /**
         * 1) Firebase sign out
         */
        const auth = getAuth(getApp());
        await fbSignOut(auth);
        
        /**
         * 2) Provider sign out
         */
        const providerType = getSignInProviderId();
        if (providerType === ProviderIdType.Google) {
          await signOutGoogle();
        }
        else if (providerType === ProviderIdType.Facebook) {
          // future: Facebook sign out
        }
        else {
          throw new Error('Unrecognized provider');
        }

      } catch (e) {
        doErrLog('auth', 'signOut', `${e}`);
      } finally {
        /**
         * 3) Force refresh of user context
         */
        setUser(null);
        signingRef.current = false;
      }
    }
  };

  /****************************************************************************************************************
   * Others
   ****************************************************************************************************************/
  const getSignInProviderId = (): string => {
    return user?.providerData[0]?.providerId ?? ProviderIdType.None;
  }

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
