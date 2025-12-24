# One For All
This project is a monorepo for building Expo apps with a shared framework. One framework for all apps, to be refined and improved over generations.

Core functionality such as UI elements, hooks, and utilities (collectively referred to as **components**) are centralized and reused across all Expo app projects.

By consolidating dependencies and common logic into a single framework, apps can be developed quickly without redefining the same building blocks.

> What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.

# End Goals
- Provide a ready-to-use template for quickly building new Expo apps.
- Maintain a shared framework of reusable components.
- Manage dependencies centrally (monorepo philosophy).
- Keep app projects lightweight by only adding app-specific code.
- Support native builds (`npx expo run:android` / `npx expo run:ios`) with Metro-powered hot reloading.

# Project Structure
## Overview
The monorepo is structured as follows:
```bash
root/
├── apps/
│   └── DevApp/          # example Expo app consuming the framework
│       └── ...
├── node_modules/		 # all common deps installed here
├── packages/
│   └── Framework/       # core shared framework
│       └── ...
├── install.bat          # sync shared deps then install (Windows helper)
├── scripts/		     # shared build scripts
│       └── ...
├── templates/			 # shared config templates
│       └── ...
└── package.json         # root scripts + shared version pins (overrides)
```

# High Level Overview
At a high level, this repository follows a monorepo + shared framework model optimized specifically for Expo and React Native development.

## root/
The root of the repository acts as the single source of truth for the entire monorepo.

It is responsible for:
- Defining and pinning dependency versions via `overrides`
- Managing tooling and workspace configuration
- Hosting shared configuration templates
- Coordinating setup and maintenance scripts
- Declaring workspace boundaries (`apps/*`, `packages/*`)

All apps and packages inherit behavior from the root, ensuring consistency and preventing configuration or dependency drift.

## apps/
Each app is a thin consumer of the shared framework and infrastructure.

An app:
- Focuses on app-specific UI, navigation, and business logic
- Imports shared components, hooks, and utilities from the Framework
- Declares what dependencies it needs, but not which versions
- Extends shared configuration instead of redefining it

Apps are intentionally lightweight. They should not duplicate setup, dependency versioning, or cross-app concerns unless absolutely necessary.

## packages/Framework/
The Framework package contains shared, app-agnostic code intended to be reused across all apps in the monorepo.

Typical responsibilities include:
- Reusable UI elements
- Reusable components
- Shared hooks and helpers
- Common utilities and abstractions
- Cross-app logic that should evolve in one place

Because the Framework lives inside the monorepo:
- No publishing step is required
- Changes are immediately available to all apps
- Metro resolves it as a local workspace dependency

The Framework is designed to enable apps, not control them. App architecture and behavior remain app-owned.

## templates/
The templates directory contains base configuration files shared across apps.

Apps import and extend these base configs rather than copying them.
This keeps configuration consistent while still allowing per-app customization.

## scripts/
The scripts directory contains maintenance and orchestration scripts used by the monorepo.

Scripts in this directory are typically invoked from root-level npm scripts and are considered part of the monorepo's internal tooling.

# Prerequisite
## Firebase project
All client apps are bootstrapped with Firebase support enabled, therefore requiring a corresponding Firebase project to be linked before native Android builds can succeed.

> Refer to [Firebase → Firebase Project Setup](https://github.com/yct37785/One-For-All/tree/main?tab=readme-ov-file#firebase-project-setup) for detailed steps.

Simply download the project's `google-services.json` and place it in the app root later.

## Initial setup
After cloning the repository (or whenever shared dependencies are modified), run the following from the root of the project:
```
install.bat
```
This script:
- Synchronizes shared dependencies across apps
- Regenerates the lockfile using root-pinned versions
- Installs all workspace dependencies in a consistent state

This only needs to be run on first clone or after changes to shared dependencies.

## Ninja (Windows / Android Builds)
When building Android on Windows, you may encounter the following error during native compilation (triggered by `react-native-keyboard-controller`):

![asdasds](https://github.com/user-attachments/assets/7cccd0db-31bb-4a4e-b44c-aeb93cc876c5)

This is a known limitation of older versions of Ninja, which is bundled with the Android SDK's CMake installation. Fix:

1. Download the latest `ninja.exe` from the [official releases page](https://github.com/ninja-build/ninja/releases).

2. Locate your Android SDK CMake installation:

	```
	C:\Users\<your-user>\AppData\Local\Android\Sdk\cmake\<version>\bin
	```

3. Replace the existing `ninja.exe` in that folder with the downloaded one.

	> Use the same CMake version that is reported in the error output when the build fails.
	(The path shown in the error log tells you exactly which <version> to target.)

4. After replacing `ninja.exe`, rerun your Android build.

# Getting Started
Follow these steps to create a new Expo app using the shared framework.

## 1. Create a new app folder
Inside the `apps/` directory, create a new folder using your app's name:
```
apps/MyNewApp/
```

## 2. Copy the base app structure
Copy the contents of `apps/DevApp` into your new app folder except for the following directories and files (if present):
- `.expo/`

- `android/`

- `google-services.json`

- `.env`

These files are either build artifacts or app-specific secrets and should be generated per app.

## 3. Open the workspace
Open the repository using the provided `vsc.code-workspace` file.

This keeps the entire monorepo visible in the editor, allowing you to work on:
- The new app
- The shared Framework
- Shared configuration and scripts

It ignores DevApp and any other app folders under `apps/`.

## 4. Update app metadata
Inside your new app folder, update the following files:

### package.json
Set the app name to match your new app (note casing):
```
{
  "name": "mynewapp"
}
```

### app.config.js
Update the Expo configuration to reflect your new app (note casing):
```
expo: {
  name: "MyNewApp",
  slug: "mynewapp",
  version: "1.0.0",
	...
  android: {
  	...
    package: "com.anonymous.mynewapp"
  }
}
```
> Note: The Android package name must be unique across apps.

## 5. App code
Application code lives under:
```
apps/MyNewApp/src/
```

`App.tsx` is the entry point for the app.

You can now modify the copied DevApp code as needed, replacing screens, logic, and assets to match your new app.

## 6. Build and run
For Android development, helper scripts are provided to simplify building and running the app:

### Run without rebuilding native code
```
run-android-dev.bat
```

Use this for normal development when native dependencies and configuration have not changed.

### Rebuild native code and run
```
run-android-dev-rebuild.bat
```

Use this when:
- Running the app for the first time
- Adding or updating native dependencies
- Changing Expo or native configuration
- Regenerating or cleaning the Android project

Both scripts launch the app with hot-reloading enabled for fast iteration.

### Your first build
1. Connect an Android device with USB debugging enabled.

2. Place the corresponding Firebase project's `google-services.json` in app root.

3. Run `run-android-dev-rebuild.bat`.

4. The app should now build and launch on your Android device.

5. If the app does not automatically launch, just run `run-android-dev.bat`.

From this point on, you can use either script as needed.

## 7. Tracking your app project
Each app created under `apps/` is intended to be its own project, even though it lives inside the monorepo.

For end users, this means tracking your app in it's own Git repository.

# Firebase
## Firebase project setup
### 1. Create a Firebase project
1. Login to [Firebase console](https://console.firebase.google.com/ "Firebase console").

2. Create a new Firebase project.
	> To prevent confusion, your project name should be different from the app name.

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

4. Click Add fingerprint, paste the SHA-1 value, and save.

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

### 4. Configure Google Sign-In in the App
1. Go to Firebase project console, Authentication → Sign-in method, select the Google provider.

2. Expand Web SDK configuration and copy the Web client ID.

3.  Create a `.env` file in your app root and add:
```
GOOGLE_WEB_CLIENT_ID = <your_web_client_id>
```

4. Run `run-android-dev.bat`.

The app should now launch with Firebase Anonymous Auth and Google Sign-In enabled.

## Firestore setup
