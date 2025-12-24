# Firebase
## Firebase project setup
### 1. Create a Firebase project
1. Login to [Firebase console](https://console.firebase.google.com/ "Firebase console").

2. Create a new Firebase project.
	> To prevent confusion, your project name should be different from the app name. E.g. My New Project.

### 2. Register the Android app
1. On the project dashboard, click "+ Add app".

2. Select the Android platform.

3. Enter the Android package name from your app's `app.config.js`:
```
  android: {
  	...
    package: "com.anonymous.mynewapp"
  }
```

4. Optionally provide an app nickname.

5. Click Register app.

6. Download `google-services.json` when prompted and complete setup.

7. Place the downloaded `google-services.json` in your app's root directory.

## Firebase auth setup
This section enables Firebase Authentication, including Anonymous and Google Sign-In, for Android builds.

### 1. Add the app signing fingerprint
Firebase requires the Android app's signing certificate fingerprint to validate authentication requests.
1. From the app root directory, run `get-fingerprint.bat`. This outputs the SHA-1 fingerprint of the Android debug signing key used on your machine.

   <img width="1470" height="422" alt="Screenshot 2025-12-24 020917" src="https://github.com/user-attachments/assets/b6e0fd4c-42ef-4d58-892a-390106baf78c" />

2. Return to the Firebase Console.

3. Navigate to your registered Android app settings.

   <img width="1402" height="735" alt="Screenshot 2025-12-23 235853" src="https://github.com/user-attachments/assets/327e4289-6599-4012-826e-4c138fcbef0c" />

5. Click Add fingerprint, paste the SHA-1 value, and save.

> Note: The SHA-1 fingerprint is machine-specific, not app-specific.
get-fingerprint.bat is run from the app root only because it relies on gradlew.

### 2. Enable authentication providers in Firebase
1. In the Firebase console, Build → Authentication, click on Get started.

2. Under Native providers, select Anonymous, enable it, and save.

3. Click Add new provider → Additional providers → Google.

4. Enable Google Sign-In.

5. Enter a public-facing project name and support email, then save.

6. When prompted, download the latest `google-services.json` file.

7. Place it in your app root and re-run `run-android-dev-rebuild.bat`.

### 3. Google Cloud configuration
Firebase projects are backed by Google Cloud projects. Google Sign-In requires additional configuration there.
1. Go to [Google Cloud console](https://console.cloud.google.com/) and select the Firebase project we created.

2. Go to APIs & Services → Credentials, ensure an OAuth 2.0 Client ID exists for your Android app package:
   
   <img width="2532" height="776" alt="Screenshot 2025-12-24 095849" src="https://github.com/user-attachments/assets/7a0d8b3c-ce6c-452a-8f38-2c7f422c93a4" />

3. Open the client and verify that the SHA-1 certificate fingerprint field is populated. If missing, paste the same debug SHA-1 and save.

4. Go to APIs & Services → OAuth consent screen, it will redirect you to this screen instead. Fill up the tabs highlighted in red:
   
   <img width="2000" height="965" alt="Screenshot 2025-12-24 100150" src="https://github.com/user-attachments/assets/05dd2453-bbd5-4261-92a7-a8d2f7f58830" />

5. Under Branding, fields are optional for development. Verification status can be ignored while the app is in test mode.

6. Under Audience:
	- Set status to Testing
	- User type should remain External
	- Add test Gmail accounts under Add users

	<img width="917" height="820" alt="Screenshot 2025-12-24 100552" src="https://github.com/user-attachments/assets/aa0a0e44-707b-457e-95a4-5e79afb61f77" />

7. Under Clients, no changes are required (the OAuth client was created automatically).

8. Under Data Access, ensure the required scopes are added, then Update and Save.

    <img width="2212" height="1252" alt="Screenshot 2025-12-24 100756" src="https://github.com/user-attachments/assets/ec4bb7d9-94cc-432f-b789-1280d8aaae76" />

### 4. Configure Google sign-in in the app
1. Go to Firebase project console, Authentication → Sign-in method, select the Google provider.

2. Expand Web SDK configuration and copy the Web client ID.

3.  Create a `.env` file in your app root and add:
```
GOOGLE_WEB_CLIENT_ID = <your_web_client_id>
```

4. Run `run-android-dev.bat`.

The app should now launch with Firebase Anonymous Auth and Google Sign-In enabled.

## Firestore setup
