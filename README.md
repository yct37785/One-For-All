# One For All
This project is a monorepo for building Expo apps with a shared framework. One framework for all apps, to be refined and improved over generations.

Apps stay thin and focused on product logic, while shared components such as UI, hooks, utilities, configuration, and dependencies live in a centralized platform package.

> What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.

# Philosophy
- Ready-to-use template for creating new Expo apps.
- A single shared platform framework reused across all apps.
- Centralized dependency version control (no version drift).
- Apps contain only app-specific code and deps.
- Shared configuration via composable base templates.
- Native builds with Metro-powered hot reloading.

# Project Structure
## Overview
The monorepo is structured as follows:
```bash
root/
├── apps/
│   └── DevApp/                # example Expo app consuming the platform
│       └── ...
├── node_modules/              # single shared dependency tree
├── packages/
│   └── platform/              # shared framework (UI, hooks, utilities, deps)
│       └── ...
├── templates/                 # shared base configs (Expo, Babel, TS)
│       └── ...
├── install.bat                # Windows helper (optional)
├── package.json               # workspace + dependency version pins
└── tsconfig.json              # minimal root TS config
```

# High-Level Architecture
This repository uses npm workspaces with a single shared `node_modules` directory at the root.

All common dependencies are hoisted and resolved centrally, ensuring:
- Consistent dependency versions across all apps
- Faster installs
- No version drift between projects

## root/
The repository root is the single source of truth for the monorepo.

It is responsible for:
- Declaring npm workspaces (`apps/*`, `packages/*`)
- Hosting shared config templates
- Coordinating setup and tooling scripts
- owning the shared `node_modules` directory

The root `package.json`:
- Pins core dependencies Expo, React, and React Native versions centrally using `overrides`, guaranteeing they match across all apps
- Defines monorepo-level tooling scripts (setup, type-checking, etc.)

## packages/platform/
The platform package contains shared, app-agnostic code and shared third-party dependencies used across all apps.

Typical responsibilities:
- Reusable UI components
- Shared hooks and helpers
- Utilities and abstractions
- Cross-app logic
- Declares common third-party dependencies (navigation, Firebase, UI libs, etc.)

Because the platform lives inside the monorepo:
- No publishing step is required
- Changes are instantly available to all apps
- Metro resolves it as a local workspace dependency

## apps/
Each app is a thin consumer of the shared platform.

An app:
- Focuses on app-specific UI, navigation, and business logic
- Imports shared functionality from the platform
- Extends shared configuration instead of redefining it
- Declares only app-specific dependencies

Notice the re-declaration of core dependencies in your app `package.json`:
```
{
  "expo": "*",
  "react": "*",
  "react-native": "*"
}
```
This is required for Expo CLI and native build tooling to function correctly.

Actual versions are still resolved centrally via root-level `overrides`, so no version drift occurs.

Apps should not duplicate setup, tooling, or cross-app concerns unless absolutely necessary.

## templates/
The `templates` directory contains shared base configuration files that are composed, not copied.

This includes:
- Expo config (`app.config.base.js`)
- Babel config (`babel.config.base.js`)
- TypeScript config (`tsconfig.base.json`)

Apps extend these templates and override only what is app-specific, keeping configuration consistent across the monorepo.

## Dependency rules
To summarize:
- Shared dependencies are declared once in `packages/platform`
- Apps declare only app-specific dependencies
- Apps must declare `expo`, `react`, and `react-native` as `"*"`
- Do not add shared dependencies directly to apps

# Prerequisite
## Firebase project
All apps are bootstrapped with Firebase support enabled.

Before running a native Android build, you must:
1. Create a Firebase project
2. Download `google-LocalData.json`
3. Place it in the root of the app folder

> Refer to [Firebase → Firebase project setup](https://github.com/yct37785/One-For-All/blob/main/readmes/Firebase.md#firebase-project-setup) for detailed steps.

## Initial setup
After cloning the repository (or after modifying shared dependencies):
```
install.bat
```
This installs all workspace dependencies into a single shared node_modules`.

## Android (Windows) - Ninja Fix
When building Android on Windows, you may encounter a native build failure related to Ninja, typically triggered by `react-native-keyboard-controller`.

![asdasds](https://github.com/user-attachments/assets/7cccd0db-31bb-4a4e-b44c-aeb93cc876c5)

This is caused by an outdated Ninja binary bundled with the Android SDK.

Fix:
1. Download the latest `ninja.exe` from the [official releases page](https://github.com/ninja-build/ninja/releases)

2. Locate your Android SDK CMake folder:

	```
	C:\Users\<your-user>\AppData\Local\Android\Sdk\cmake\<version>\bin
	```

3. Replace the existing `ninja.exe`

	> Use the same CMake version that is reported in the error output when the build fails.
	(The path shown in the error log tells you exactly which <version> to target.)

4. Re-run your Android build

# Creating a New App

## 1. Create app folder
```
apps/MyNewApp/
```

## 2. Copy the base app
Copy everything from `apps/DevApp` except:

- `.expo/`

- `android/`

- `google-LocalData.json`

- `.env`

These are app-specific or generated files.

## 3. Open the workspace
Open the repo using the provided `vsc.code-workspace` file.

It ignores DevApp and any other app folders under `apps/` to prevent confusion.

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
App code lives under:
```
apps/MyNewApp/src/
```

`App.tsx` is the entry point.

You can now modify the copied DevApp code as needed, replacing screens, logic, and assets to match your new app.

## 6. Build scripts
Each app includes helper scripts:

### Run without rebuilding native code
```
run-android-dev.bat
```

Use this for normal development when native dependencies and config have not changed.

### Rebuild native code and run
```
run-android-dev-rebuild.bat
```

Use this when:
- Running the app for the first time
- Adding or changing native dependencies
- Modifying Expo or native configuration
- Regenerating or cleaning the Android project

Both scripts support hot reloading.

## 7. Your first build
1. Connect an Android device with USB debugging enabled.

2. Place the corresponding `google-LocalData.json` in app root.

3. Run `run-android-dev-rebuild.bat`.

4. The app should now build and launch on your Android device.

5. If the app does not automatically launch, just run `run-android-dev.bat`.

From this point on, you can use either script as needed.

## 8. App Ownership
Each app under `apps/` is intended to be treated as an independent product, even though it lives inside the monorepo.

For end users, this usually means:
- Tracking the app in its own Git repository
- Using this monorepo as the shared development foundation

# Firebase
[Refer to the Firebase section here](https://github.com/yct37785/One-For-All/blob/main/readmes/Firebase.md).
