import Constants from 'expo-constants';
import { logColors } from '../../Const';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  onIdTokenChanged,
  reload,
  type FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getFirestore, disableNetwork, enableNetwork } from '@react-native-firebase/firestore';
import { doLog, doErrLog } from '../../Util/General';

/******************************************************************************************************************
 * [ASYNC] Configure Google Sign-In using the GOOGLE_WEB_CLIENT_ID environment variable.
 *
 * @throws {Error} if configuration fails or web client id is missing (logged)
 ******************************************************************************************************************/
export async function configureGoogleSignIn() {
  const webClientId = Constants.expoConfig?.extra?.googleWebClientId;
  if (!webClientId) {
    doErrLog('auth', 'configureGoogleSignIn', 'GoogleSignin load failed: Missing webClientId');
  } else {
    GoogleSignin.configure({ webClientId });
    doLog('auth', 'configureGoogleSignIn', `GoogleSignin loaded: ${logColors.green}${webClientId.slice(0, 10)}..`);
  }
}

/******************************************************************************************************************
 * [ASYNC] Apply Firestore network policy based on user type.
 *
 * @param user - Current Firebase user or null
 ******************************************************************************************************************/
export async function applyNetworkPolicyFor(user: FirebaseAuthTypes.User | null) {
  try {
    const db = getFirestore(getApp());
    if (user?.isAnonymous) {
      await disableNetwork(db);
    } else if (user) {
      await enableNetwork(db);
    }
  } catch {
    // Firestore might not be installed yet; ignore gracefully
  }
}

/******************************************************************************************************************
 * [ASYNC] Ensure there is a signed-in user by creating an anonymous session when none exists (local-first).
 ******************************************************************************************************************/
export async function ensureAnonymousSession() {
  const auth = getAuth(getApp());
  if (!auth.currentUser) {
    try {
      const { user } = await signInAnonymously(auth);
      doLog('auth', 'ensureAnonymousSession', `Anon uid: ${logColors.green}${user.uid.slice(0, 10)}..`);
      await applyNetworkPolicyFor(user);
    } catch (e) {
      doLog('auth', 'ensureAnonymousSession', `Anonymous sign-in failed: ${e}`);
    }
  } else {
    await applyNetworkPolicyFor(auth.currentUser);
  }
}

/******************************************************************************************************************
 * [ASYNC] Verify that the current Firebase user is still valid on the server.
 * 
 * @return - True if the user remains valid, false if disabled, deleted, or otherwise invalid
 ******************************************************************************************************************/
export async function verifyCurrentUser(): Promise<boolean> {
  const auth = getAuth(getApp());
  const u = auth.currentUser;
  if (!u) return false;
  try {
    await reload(u);
    return true;
  } catch (e: any) {
    const code: string | undefined = e?.code || e?.message;
    const invalid =
      code?.includes('user-disabled') ||
      code?.includes('user-not-found') ||
      code?.includes('user-token-expired') ||
      code?.includes('invalid-user-token') ||
      false;
    if (invalid) {
      doLog('auth', 'verifyCurrentUser', `Remote invalidation (${code})`);
      return false;
    }
    throw e;
  }
}

/****************************************************************************************************************
 * Start Firebase auth observers (auth-state and ID-token) to keep UI state and network policy in sync.
 *
 * @param params - Observer callbacks:
 *   - onUser         - Receives Firebase user or null on auth-state changes
 *   - onInvalidation - Called when the current user becomes invalid and should be signed out
 *
 * @return - Unsubscribe function that stops all observers
 *
 * @usage
 * ```ts
 * const stop = startAuthObservers({ onUser: setUser, onInvalidation: signOut })
 * // later…
 * stop()
 * ```
 ****************************************************************************************************************/
export function startAuthObservers(params: {
  onUser: (u: FirebaseAuthTypes.User | null) => void;
  onInvalidation: () => Promise<void> | void;
}) {
  const auth = getAuth(getApp());

  /**
   * Auth-state observer:
   * - Fires on meaningful identity changes (sign in/out, link, anon→Google, etc.)
   * - Updates the context user and enforces network policy for the new state
   */
  const unsubAuth = onAuthStateChanged(auth, async (u) => {
    let logMsg = '';
    if (u && !u.isAnonymous) logMsg = `google uid = ${logColors.green}${u.uid.slice(0, 10)}..`;
    else if (u && u.isAnonymous) logMsg = `anon uid = ${logColors.green}${u.uid.slice(0, 10)}..`;
    else logMsg = 'no user';
    doLog('auth', 'onAuthStateChanged', logMsg);

    // keep consumer state in sync, then enforce network policy for new state
    params.onUser(u);
    await applyNetworkPolicyFor(u);
  });

  /**
   * ID-token observer:
   * - Fires on token refreshes (and also on sign in/out)
   * - Do NOT update context user here to avoid re-renders on every refresh
   * - Run a health check for anon/Google users; if invalid, let caller handle sign-out
   */
  const offToken = onIdTokenChanged(auth, async (u) => {
    if (!u) return; // skip null
    try {
      const ok = await verifyCurrentUser();
      if (!ok) await params.onInvalidation();
    } catch {
      // ignore transient issues; will check again on next event
    }
  });

  return () => {
    offToken();
    unsubAuth();
  };
}

/****************************************************************************************************************
 * [ASYNC] Force the Google account picker to appear by clearing any cached Google session.
 ****************************************************************************************************************/
export async function ensureAccountPicker() {
  try {
    if (GoogleSignin.hasPreviousSignIn()) {
      await GoogleSignin.signOut();
      // optionally: await GoogleSignin.revokeAccess();
    }
  } catch {
    // best-effort
  }
}
