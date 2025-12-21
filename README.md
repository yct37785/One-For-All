# One For All
This project is a monorepo for building Expo apps with a shared framework. One framework for all apps, to be refined and improved over generations.

Core functionality such as UI elements, hooks, and utilities (collectively referred to as **components**) are centralized and reused across all Expo app projects.

By consolidating dependencies and common logic into a single framework, apps can be developed quickly without redefining the same building blocks.

*What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.*

## End Goals
- Provide a ready-to-use template for quickly building new Expo apps.
- Maintain a shared framework of reusable components.
- Manage dependencies centrally (monorepo philosophy).
- Keep app projects lightweight by only adding app-specific code.
- Support native builds (`npx expo run:android` / `npx expo run:ios`) with Metro-powered hot reloading.

## Project Structure
### Overview
The monorepo is structured as follows:
```bash
root/
├── apps/
│   └── DevApp/        # example Expo app consuming the framework
│       └── ...
├── node_modules/			# all common deps installed here
├── packages/
│   └── Framework/          # core shared framework
│       └── ...
├── install.bat             # sync shared deps then install (Windows helper)
├── scripts/				# shared build scripts
│       └── ...
├── templates/				# shared config templates
│       └── ...
└── package.json            # root scripts + shared version pins (overrides)
```

## High Level Overview
At a high level, this repository follows a monorepo + shared framework model optimized specifically for Expo and React Native development.

### root/
The root of the repository acts as the single source of truth for the entire monorepo.

It is responsible for:
- Defining and pinning dependency versions via `overrides`
- Managing tooling and workspace configuration
- Hosting shared configuration templates
- Coordinating setup and maintenance scripts
- Declaring workspace boundaries (`apps/*`, `packages/*`)

All apps and packages inherit behavior from the root, ensuring consistency and preventing configuration or dependency drift.

### apps/
Each app is a thin consumer of the shared framework and infrastructure.

An app:
- Focuses on app-specific UI, navigation, and business logic
- Imports shared components, hooks, and utilities from the Framework
- Declares what dependencies it needs, but not which versions
- Extends shared configuration instead of redefining it

Apps are intentionally lightweight. They should not duplicate setup, dependency versioning, or cross-app concerns unless absolutely necessary.

### packages/Framework/
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

### templates/
The templates directory contains base configuration files shared across apps.

Apps import and extend these base configs rather than copying them.
This keeps configuration consistent while still allowing per-app customization.

### scripts/
The scripts directory contains maintenance and orchestration scripts used by the monorepo.

Scripts in this directory are typically invoked from root-level npm scripts and are considered part of the monorepo's internal tooling.
