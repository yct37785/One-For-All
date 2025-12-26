import { Platform } from 'react-native';
import { GoogleAuthProvider } from '@react-native-firebase/auth';
import Constants from 'expo-constants';
import { logColors } from '../../../Defaults';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { doLog, doErrLog, withTimeout } from '../../../Util/General';

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

/******************************************************************************************************************
 * [ASYNC] Configure Google Sign-In using the GOOGLE_WEB_CLIENT_ID environment variable.
 *
 * @throws {Error} - if configuration fails or web client id is missing (logged)
 ******************************************************************************************************************/
export async function configureGoogleSignIn() {
  const webClientId = Constants.expoConfig?.extra?.googleWebClientId;
  if (!webClientId) {
    doErrLog('authGoogle', 'configureGoogleSignIn', 'GoogleSignin load failed: Missing webClientId');
  } else {
    GoogleSignin.configure({ webClientId });
    doLog('authGoogle', 'configureGoogleSignIn', `GoogleSignin loaded: ${logColors.green}${webClientId.slice(0, 10)}..`);
  }
}

/****************************************************************************************************************
 * [ASYNC] Perform Google Sign-In and authenticate with Firebase.
 *
 * Behavior:
 * - If no current user -> sign in with Google credential
 * - If a user already exists (future providers) -> attempt to link Google credential
 *   - If link fails due to "credential already in use", fall back to sign-in
 * 
 * @return - Credential object
 *
 * @throws {Error} any uncaught internal error during sign-in
 ****************************************************************************************************************/
export async function signInGoogle(): Promise<any> {

  try {
    /** 1) Ensure Play Services on Android **/
    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    }

    /** 2) Launch Google account picker and fetch ID token (bounded to avoid silent hangs) **/
    await ensureAccountPicker();
    const res: any = await withTimeout(GoogleSignin.signIn(), 30000, 'Google sign-in timeout');
    const idToken = res?.idToken ?? res?.data?.idToken;
    if (!idToken) {
      doErrLog('auth', 'signIn', 'Google sign-in failed: missing idToken');
      return;
    }

    /** 3) Create Firebase credential **/
    return GoogleAuthProvider.credential(idToken);

  } catch (e) {
    doErrLog('authGoogle', 'signInGoogle', `${e}`);
  }
};

/****************************************************************************************************************
 * [ASYNC] Perform Google sign out.
 *
 * @throws {Error} any uncaught internal error during sign out
 ****************************************************************************************************************/
export async function signOutGoogle(): Promise<any> {
  try {
    await GoogleSignin.signOut();
  } catch (e) {
    doErrLog('authGoogle', 'signOutGoogle', `${e}`);
  }
};
