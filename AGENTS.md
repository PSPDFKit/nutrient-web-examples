# Agent Guide: nutrient-web-examples

Framework integration examples for [Nutrient Web SDK](https://www.nutrient.io/sdk/web/).
Each subdirectory in `examples/` is a standalone project showing how to integrate
the SDK with a specific framework or build tool.

## Repository Structure

```
nutrient-web-examples/
├── examples/
│   ├── angular/              # Angular (ng serve)
│   ├── asp-net/              # ASP.NET (C#, no Node)
│   ├── blazor/               # Blazor Server + WASM (C#, no Node)
│   ├── electron/             # Electron (preload pattern)
│   ├── electron-nodeintegration/  # Electron (nodeIntegration)
│   ├── elm/                  # Elm
│   ├── gatsbyjs/             # Gatsby (⚠️ deprecated framework)
│   ├── javascript-vite/      # Vanilla JS + Vite ← simplest starting point
│   ├── laravel/              # Laravel + PHP
│   ├── nextjs/               # Next.js
│   ├── nuxtjs/               # Nuxt.js
│   ├── pwa/                  # Progressive Web App
│   ├── react/                # React (create-react-app)
│   ├── salesforce/           # Salesforce LWC
│   ├── svelte/               # Svelte
│   ├── svelte-kit/           # SvelteKit
│   ├── typescript/           # TypeScript + Webpack
│   ├── typescript-vite/      # TypeScript + Vite
│   ├── vite/                 # Vanilla JS + Vite (alternate)
│   ├── vue/                  # Vue 3
│   ├── vue-composition-api/  # Vue 3 Composition API
│   ├── wasm-benchmark/       # WASM performance benchmark
│   └── webpack/              # Webpack
├── tests/
│   └── load.test.ts          # Playwright smoke test (shared across examples)
├── scripts/
│   ├── install-dependencies.sh    # Install deps in all examples
│   ├── e2e-tests.sh              # Run Playwright against each example
│   ├── audit-dependencies.sh     # npm audit fix across examples
│   ├── update-nutrient-in-examples.sh  # Bump SDK version everywhere
│   ├── update-nutrient-in-cdn.js       # Update CDN URLs
│   └── check-biome-version.sh    # Verify Biome version consistency
├── playwright.config.ts      # Playwright config (uses SERVER_DIR env var)
└── biome.json                # Biome formatter config
```

## Example Anatomy

Every example follows the same pattern:

- `package.json` with `start` script (dev server on a port)
- `README.md` with prerequisites, setup, and usage instructions
- Framework-specific config (vite.config.js, angular.json, etc.)
- Source code that calls `PSPDFKit.load()` with a container and PDF

Examples that support e2e testing also have a `start:e2e` script that serves
on port 3000 (required by the Playwright config).

## SDK Version

All examples pin the same `@nutrient-sdk/viewer` version. To update:

```bash
./scripts/update-nutrient-in-examples.sh <new-version>
```

This updates `package.json` in every example directory.

## Commands

```bash
# Install all example dependencies
npm run install-dependencies

# Format code (Biome)
npm run format

# Run e2e smoke tests (starts each example, checks PSPDFKit loads)
npm run e2e-tests

# Run Playwright directly for a single example
SERVER_DIR=examples/javascript-vite npm run test

# Audit and fix vulnerabilities across all examples
npm run audit-fix

# Bump Nutrient SDK version in all examples
npm run update-nutrient-version
```

## Adding a New Example

1. Create `examples/<framework-name>/`
2. Add a `package.json` with:
   - `start` script — dev server
   - `start:e2e` script — dev server on port 3000 (for Playwright)
3. The example must call `PSPDFKit.load()` and render `.PSPDFKit-Container`
4. Add a `README.md` following the pattern of existing examples:
   - Prerequisites
   - Getting started (clone, install, run)
   - Usage with CDN vs npm (if applicable)
5. Use the current pinned `@nutrient-sdk/viewer` version
6. Run the Playwright smoke test against your example:
   ```bash
   SERVER_DIR=examples/<framework-name> npm run test
   ```
7. Update the root `README.md` if adding a new framework category

## E2E Testing

The shared Playwright test (`tests/load.test.ts`) verifies two things:
1. `.PSPDFKit-Container` is visible (SDK loaded successfully)
2. `.PSPDFKit-Error` is not visible (no runtime errors)

The `scripts/e2e-tests.sh` script iterates over all examples (except excluded ones)
and runs this test against each.

**Excluded from e2e** (no `start:e2e`, non-Node, or requires pnpm): webpack, blazor, gatsbyjs,
laravel, salesforce, wasm-benchmark, electron, electron-nodeintegration, asp-net,
svelte-kit, vue-composition-api.

## CI

- **Biome** — Code formatting check on every push/PR
- **Playwright** — Smoke tests on push/PR to main (installs all deps, runs e2e)

## Code Style

- Biome handles formatting (2-space indent, spaces)
- Husky pre-commit hook runs `lint-staged` with Biome
- Keep the Biome version in sync between `package.json` and `.github/workflows/biome.yml`

## Notes

- Some examples use CDN by default, some use the npm package — check each README
- The `react` example still uses `react-scripts` (CRA) — consider migrating to Vite
- The `gatsbyjs` example uses Gatsby v5 which is effectively unmaintained
