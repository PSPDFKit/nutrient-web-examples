# Nutrient Web SDK Examples

This repository contains framework integration examples for the [Nutrient Web SDK](https://www.nutrient.io/sdk/web).

- **Demo**: https://www.nutrient.io/demo/
- **Guides**: https://www.nutrient.io/guides/web/
- **API**: https://www.nutrient.io/guides/web/api/

## 📁 Repository Structure

```
nutrient-web-examples/
├── frameworks/              # Frontend framework examples with JS and TS variants
│   ├── react/
│   │   ├── JS/             # React + JavaScript + Vite
│   │   └── TS/             # React + TypeScript + Vite
│   ├── vue/
│   │   ├── JS/             # Vue + JavaScript + Vite
│   │   └── TS/             # Vue + TypeScript + Vite
│   ├── svelte/
│   │   ├── JS/             # Svelte + JavaScript + Vite
│   │   └── TS/             # Svelte + TypeScript + Vite
│   ├── solid/
│   │   ├── js/             # SolidJS + JavaScript + Vite
│   │   └── ts/             # SolidJS + TypeScript + Vite
│   ├── angular/
│   │   └── TS/             # Angular (TypeScript only)
│   ├── next/
│   │   ├── JS/             # Next.js + JavaScript
│   │   └── TS/             # Next.js + TypeScript
│   ├── nuxt/
│   │   ├── JS/             # Nuxt + JavaScript
│   │   └── TS/             # Nuxt + TypeScript
│   ├── sveltekit/
│   │   ├── js/             # SvelteKit + JavaScript
│   │   └── ts/             # SvelteKit + TypeScript
│   └── vanilla/
│       ├── js/             # Vanilla JS + Vite
│       └── ts/             # Vanilla TS + Vite
└── examples/               # Specialized examples and legacy integrations
    ├── webpack/            # Webpack-based example
    ├── electron/           # Electron desktop app
    ├── pwa/                # Progressive Web App
    ├── laravel/            # Laravel PHP integration
    ├── salesforce/         # Salesforce integration
    └── ...                 # Other specialized examples
```

## 🚀 Framework Examples

Each framework example demonstrates Nutrient Web SDK integration with **4 feature examples**:

### Available Examples in Each Framework

| Example             | Description               | Key Features                                   |
| ------------------- | ------------------------- | ---------------------------------------------- |
| **Basic Viewer**    | Simple PDF viewing        | Document loading, basic navigation             |
| **Magazine Mode**   | Magazine-style reader     | Double-page layout, custom toolbar, fullscreen |
| **Custom Overlays** | Interactive page overlays | Click handlers, custom UI elements on pages    |
| **Watermarks**      | Document watermarking     | Adding text/image watermarks to PDFs           |

### Supported Frameworks

| Framework | JavaScript | TypeScript | Build Tool  | Meta-Framework |
| --------- | ---------- | ---------- | ----------- | -------------- |
| React     | ✅         | ✅         | Vite        | -              |
| Vue       | ✅         | ✅         | Vite        | -              |
| Svelte    | ✅         | ✅         | Vite        | -              |
| SolidJS   | ✅         | ✅         | Vite        | -              |
| Vanilla   | ✅         | ✅         | Vite        | -              |
| Angular   | -          | ✅         | Angular CLI | -              |
| Next.js   | ✅         | ✅         | -           | React          |
| Nuxt      | ✅         | ✅         | -           | Vue            |
| SvelteKit | ✅         | ✅         | -           | Svelte         |

## 🛠️ Development

Each framework example can be run independently:

```bash
# React JavaScript
cd frameworks/react/JS
npm install
npm run dev

# Vue TypeScript
cd frameworks/vue/TS
npm install
npm run dev

# SolidJS TypeScript
cd frameworks/solid/ts
npm install
npm run dev

# Next.js JavaScript
cd frameworks/next/JS
npm install
npm run dev
```

## 📦 Installation Methods

### Frameworks Directory (CDN Installation)

All examples in `frameworks/` use **CDN installation** of Nutrient Web SDK:

```html
<script src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@{VERSION}/nutrient-viewer.js"></script>
```

This approach:

- ✅ No build configuration needed
- ✅ Faster initial setup
- ✅ Automatic updates (if using `@latest`)
- ✅ Works in any framework

### Examples Directory (Various Methods)

Examples in `examples/` may use different installation methods:

- Package installation (`npm install`)
- CDN installation
- Framework-specific integrations

## 🔧 Scripts

The repository includes maintenance scripts:

```bash
# Install dependencies in all examples and frameworks
./scripts/install-dependencies.sh

# Run e2e tests
./scripts/e2e-tests.sh

# Update Nutrient SDK versions
./scripts/update-nutrient-in-examples.sh
```

## 🎯 Example Structure

Each framework example follows a consistent pattern:

```
frameworks/{framework}/{JS|TS}/
├── src/
│   ├── nutrient/
│   │   ├── nutrient-config.{js|ts}           # Shared config
│   │   ├── loadNutrientViewer.{js|ts}        # CDN loader
│   │   ├── basic-viewer/
│   │   │   └── implementation.{js|ts}        # Basic viewer logic
│   │   ├── magazine-mode/
│   │   │   └── implementation.{js|ts}        # Magazine mode logic
│   │   ├── custom-overlays/
│   │   │   └── implementation.{js|ts}        # Custom overlays logic
│   │   └── watermarks/
│   │       └── implementation.{js|ts}        # Watermarks logic
│   ├── pages/
│   │   ├── HomePage.{jsx|tsx|vue|svelte}     # Landing page with links
│   │   ├── BasicViewerPage.{jsx|tsx|vue|svelte}
│   │   ├── MagazineModePage.{jsx|tsx|vue|svelte}
│   │   ├── CustomOverlaysPage.{jsx|tsx|vue|svelte}
│   │   └── WatermarksPage.{jsx|tsx|vue|svelte}
│   └── components/
│       └── logos/                             # Framework logos
├── package.json
└── vite.config.{js|ts}                       # Build configuration
```

## 🤝 Contributing

When adding new framework examples:

1. **Follow the naming convention**:

   - Use `{framework}/{JS|TS}/` for Vite-based frameworks
   - Use `{framework}/{js|ts}/` for framework CLIs (lowercase)

2. **Include all 4 examples**: Basic Viewer, Magazine Mode, Custom Overlays, Watermarks

3. **Use CDN installation**: Keep examples simple and framework-focused

4. **Maintain consistency**:

   - Same file structure across all frameworks
   - Same implementation logic (just adapted to framework patterns)
   - Same styling and UI

5. **Add both JS and TS variants** (where applicable)

## 📚 Additional Resources

- [Nutrient Web SDK Documentation](https://www.nutrient.io/guides/web/)
- [Nutrient Web SDK API Reference](https://www.nutrient.io/guides/web/api/)
- [Nutrient Support](https://www.nutrient.io/support/)

## 📄 License

Examples are provided for demonstration purposes. Check individual example directories for specific license information.
