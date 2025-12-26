import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  linkWithCredential,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { startAuthObservers } from './FirebaseAuthHelpers';
import { doErrLog } from '../../../Util/General';

/******************************************************************************************************************
 * User provider.
 ******************************************************************************************************************/
export enum ProviderIdType {
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

    // seed immediately so downstream can reflect an existing session (if any)
    const auth = getAuth(getApp());
    const seeded = auth.currentUser ?? null;
    setUser(seeded);

    // sub to observers
    const stop = startAuthObservers({
      onUser: setUser,    // ensure user is always updated for downstream
      onInvalidation: async () => {
        // account invalidation on Firebase side = sign out locally
        await signOut();
      },
    });

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
  const signIn = async (): Promise<void> => {
    if (!signingRef.current) {
      signingOutRef.current = true;
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
    }
  };

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
