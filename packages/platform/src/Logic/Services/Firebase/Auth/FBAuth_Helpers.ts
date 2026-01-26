import { logColors } from '../../../Defaults';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  reload,
  type FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { doLog, doErrLog } from '../../../Util/General';

/******************************************************************************************************************
 * [ASYNC] Verify that the current Firebase user is still valid on the server.
 *
 * @return - True if the user remains valid, false if disabled, deleted, or otherwise invalid
 ******************************************************************************************************************/
export async function FBAuth_verifyCurrentUser(): Promise<boolean> {
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
export function FBAuth_startAuthObservers(params: {
  onUser: (u: FirebaseAuthTypes.User | null) => void;
  onInvalidation: () => Promise<void> | void;
}) {
  const auth = getAuth(getApp());

  /**
   * Auth-state observer:
   * - Fires on identity changes (sign in/out, link, etc.)
   * - Updates the context user and enforces network policy for the new state
   */
  const unsubAuth = onAuthStateChanged(auth, async (u) => {
    const logMsg = u ? `uid = ${logColors.green}${u.uid.slice(0, 10)}..` : 'no user';
    doLog('auth', 'onAuthStateChanged', logMsg);

    // keep consumer state in sync
    params.onUser(u);
  });

  /**
   * ID-token observer:
   * - Fires on token refreshes (and also on sign in/out)
   * - Do NOT update context user here to avoid re-renders on every refresh
   * - Run a health check; if invalid, let caller handle sign-out
   */
  const offToken = onIdTokenChanged(auth, async (u) => {
    if (!u) return; // skip null
    try {
      const ok = await FBAuth_verifyCurrentUser();
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