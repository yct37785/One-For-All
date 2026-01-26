import React, { createContext, useContext, useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInWithCredential,
  linkWithCredential,
  FirebaseAuthTypes,
  signOut as fbSignOut,
} from '@react-native-firebase/auth';
import { FBAuth_startAuthObservers, FBAuth_verifyCurrentUser } from './FBAuth_Helpers';
import { configureGoogleSignIn, signInGoogle, signOutGoogle } from './GoogleAuth';
import { setItemKV, getItemKV, removeItemKV } from '../../LocalData/LocalKVStoreManager';
import { doErrLog } from '../../../Util/General';
import { LOCAL_DATA_DEFAULTS } from '../../../Defaults';

// provider types
export enum FBAuth_ProviderIdType {
  None = 'none',
  Google = 'google.com',
  Facebook = 'facebook.com',
}

/******************************************************************************************************************
 * FirebaseAuthManager API.
 *
 * @property user     - Current Firebase user or null
 * @property signIn   - Launch sign-in and authenticate with Firebase (optionally link if already signed in)
 * @property signOut  - Sign out from Firebase & provider
 ******************************************************************************************************************/
type FBAuth_ContextType = {
  user: FirebaseAuthTypes.User | null;
  signIn: (FBAuth_ProviderIdType: FBAuth_ProviderIdType) => Promise<void>;
  signOut: () => Promise<void>;
};

const FBAuth_Context = createContext<FBAuth_ContextType>({
  user: null,
  signIn: async () => doErrLog('auth', 'FBAuth_Context', 'AuthProvider not mounted'),
  signOut: async () => doErrLog('auth', 'FBAuth_Context', 'AuthProvider not mounted'),
});

/******************************************************************************************************************
 * Singleton auth provider that surfaces Firebase Authentication state and various sign-in flows to the app.
 *
 * Notes:
 * - `user` state is for downstream consumers only (UI, data fetches, etc).
 * - For auth operations, always prefer `auth.currentUser` to avoid state staleness.
 *
 * @usage
 * ```tsx
 * <FirebaseAuthProvider>
 *   <App />
 * </FirebaseAuthProvider>
 * ```
 ******************************************************************************************************************/
export const FBAuth_Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // guards
  const startedRef = useRef(false);
  const signingRef = useRef(false);
  const signingOutRef = useRef(false);

  /****************************************************************************************************************
   * Get current signed in provider:
   * - Prefer the locally stored "last provider" (source of truth for UX + signOut routing)
   * - Fallback to Firebase providerData when missing (best-effort)
   ****************************************************************************************************************/
  const getSignInProviderId = useCallback((): FBAuth_ProviderIdType => {
    const stored = getItemKV<string>(LOCAL_DATA_DEFAULTS.authLastProviderId);

    if (stored === FBAuth_ProviderIdType.Google) return FBAuth_ProviderIdType.Google;
    if (stored === FBAuth_ProviderIdType.Facebook) return FBAuth_ProviderIdType.Facebook;

    // fallback best-effort (not guaranteed to represent the "active" provider)
    const pid = user?.providerData?.[0]?.providerId;
    if (pid === FBAuth_ProviderIdType.Google) return FBAuth_ProviderIdType.Google;
    if (pid === FBAuth_ProviderIdType.Facebook) return FBAuth_ProviderIdType.Facebook;

    return FBAuth_ProviderIdType.None;
  }, [getItemKV, user]);

  /****************************************************************************************************************
   * [ASYNC] Perform sign-out from current provider and Firebase.
   *
   * Behavior:
   * - Resolves provider from LocalKVStore first (last used provider)
   * - Signs out from Firebase
   * - Signs out from provider (best-effort)
   * - Clears last-provider key
   ****************************************************************************************************************/
  const signOut = useCallback(async (): Promise<void> => {
    if (signingOutRef.current) return;
    signingOutRef.current = true;

    try {
      const providerType = getSignInProviderId(); // resolve before Firebase sign out

      /**
       * 1) Firebase sign out
       */
      const auth = getAuth(getApp());
      await fbSignOut(auth);

      /**
       * 2) Provider sign out (best-effort)
       */
      if (providerType === FBAuth_ProviderIdType.Google) {
        await signOutGoogle();
      } else if (providerType === FBAuth_ProviderIdType.Facebook) {
        // future: Facebook sign out
      } else {
        // no op
      }

      /**
       * 3) Clear last provider (local)
       */
      removeItemKV(LOCAL_DATA_DEFAULTS.authLastProviderId);

      /**
       * 4) Downstream state (observer will also set null, but do it defensively)
       */
      setUser(null);
    } catch (e) {
      doErrLog('auth', 'signOut', `${e}`);
    } finally {
      signingOutRef.current = false;
    }
  }, [getSignInProviderId, removeItemKV]);

  /****************************************************************************************************************
   * [ASYNC] Perform sign-in with given provider and authenticate with Firebase.
   *
   * @param providerType - Auth provider type
   ****************************************************************************************************************/
  const signIn = useCallback(async (providerType: FBAuth_ProviderIdType): Promise<void> => {
    if (signingRef.current) return;
    signingRef.current = true;

    try {
      /**
       * 1) Create Firebase cred
       */
      const auth = getAuth(getApp());
      let cred: any = null;

      if (providerType === FBAuth_ProviderIdType.Google) {
        cred = await signInGoogle();
      } else if (providerType === FBAuth_ProviderIdType.Facebook) {
        // future: Facebook sign in
      } else {
        throw new Error('Unrecognized provider');
      }

      if (!cred) return;

      /**
       * 2) Do sign-in / link
       * - Always use auth.currentUser here (not local state)
       */
      if (auth.currentUser) {
        await linkWithCredential(auth.currentUser, cred);
      } else {
        await signInWithCredential(auth, cred);
      }

      /**
       * 3) Persist "last used provider" locally (source of truth for signOut routing)
       */
      setItemKV(LOCAL_DATA_DEFAULTS.authLastProviderId, providerType);

      /**
       * 4) Invalidation check
       */
      if (!(await FBAuth_verifyCurrentUser())) {
        await signOut();
        doErrLog('auth', 'signIn', 'Invalid user after sign-in, signed out');
        return;
      }
    } catch (e) {
      doErrLog('auth', 'signIn', `${e}`);
    } finally {
      signingRef.current = false;
    }
  }, [setItemKV, signOut]);

  /****************************************************************************************************************
   * On startup:
   * - seed user (for downstream)
   * - sub to observers (user update, user invalidation)
   ****************************************************************************************************************/
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    /**
     * 1) Seed immediately so downstream can reflect an existing session (if any)
     */
    const auth = getAuth(getApp());
    setUser(auth.currentUser ?? null);

    /**
     * 2) Sub to observers
     */
    const stop = FBAuth_startAuthObservers({
      onUser: setUser, // downstream state only
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
  }, [signOut]);

  const value = useMemo<FBAuth_ContextType>(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut]
  );

  return <FBAuth_Context.Provider value={value}>{children}</FBAuth_Context.Provider>;
};

export const FB_useAuth = () => useContext(FBAuth_Context);
