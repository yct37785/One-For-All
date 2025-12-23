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

> Refer to [Firebase → Firebase Project Setup](https://github.com/yct37785/One-For-All/edit/main/README.md#firebase-project-setup) for detailed steps.

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

### Your first build (Android)
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
All client apps are bootstrapped with Firebase support enabled, therefore requiring a corresponding Firebase project to be linked before native Android builds can succeed.

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
### 1. Add the app signing fingerprint
This step is required for Firebase Authentication and Google Sign-In to function correctly on Android.

1. In the app root directory, run `get-fingerprint.bat` to output the SHA-1 fingerprint of the Android debug signing key used on your machine.

   <img width="1470" height="422" alt="Screenshot 2025-12-24 020917" src="https://github.com/user-attachments/assets/b6e0fd4c-42ef-4d58-892a-390106baf78c" />

2. Return to the Firebase Console.

3. Navigate to your registered Android app settings.

4. Click Add fingerprint, paste the SHA-1 value, and save.

5. Download the updated `google-services.json` file and place it in your app's root directory.

6. Run the `run-android-dev-rebuild.bat` again.

> Note: The SHA-1 fingerprint is tied to the local machine, not the app; get-fingerprint.bat is run from the app root solely to access gradlew.

## Firestore setup
