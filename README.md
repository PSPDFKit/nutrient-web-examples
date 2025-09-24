# Nutrient Web SDK Examples

This repository contains framework templates and feature examples for the [Nutrient Web SDK](https://www.nutrient.io/sdk/web).

- **Demo**: https://www.nutrient.io/demo/
- **Guides**: https://www.nutrient.io/guides/web/
- **API**: https://www.nutrient.io/guides/web/api/

## 🏗️ Architecture

This repository is structured to separate framework scaffolding from Nutrient feature demonstrations:

```
├── frameworks/           # Framework templates (React, Vue, etc.)
│   ├── react-js/         # React + JavaScript + Vite
│   ├── react-ts/         # React + TypeScript + Vite  
│   ├── vue-js/           # Vue + JavaScript + Vite
│   └── vue-ts/           # Vue + TypeScript + Vite
└── examples/            # Framework-agnostic Nutrient features
    ├── basic-viewer/     # Simple document loading
    └── magazine-mode/    # Advanced magazine-style viewer
```

## 🚀 Framework Templates

Framework templates provide the minimal setup needed to integrate Nutrient Web SDK with popular frameworks. Each template includes:

- Modern build tooling (Vite)
- Proper TypeScript configuration (for TS variants)
- Basic Nutrient integration
- Development server setup

### Available Templates

| Framework | Language | Template Directory |
|-----------|----------|-------------------|
| React     | JavaScript | `frameworks/react-js/` |
| React     | TypeScript | `frameworks/react-ts/` |
| Vue       | JavaScript | `frameworks/vue-js/` |
| Vue       | TypeScript | `frameworks/vue-ts/` |

Each framework template follows the same pattern:
```javascript
// Framework handles lifecycle and container
// Example handles Nutrient-specific logic

import { loadBasicViewer } from '../examples/basic-viewer/implementation.js';

// In your component
const instance = await loadBasicViewer(containerElement);
```

## 🎯 Examples

Examples demonstrate specific Nutrient Web SDK features and are framework-agnostic. Each example provides:

- Pure JavaScript implementation
- Comprehensive documentation
- Framework integration guidance

### Available Examples

| Example | Description | Features |
|---------|-------------|----------|
| `basic-viewer/` | Simple PDF viewing | Document loading, basic controls |
| `magazine-mode/` | Magazine-style reader | Double-page layout, custom toolbar, fullscreen |

## 🛠️ Development

Each framework template can be run independently:

```bash
# React JavaScript
cd frameworks/react-js
npm install
npm run dev

# Vue TypeScript  
cd frameworks/vue-ts
npm install
npm run dev
```

## 📚 Usage with CLI Tools

This repository is designed to work with scaffolding tools like `create-nutrient-app`. The CLI can:

1. **Choose Framework**: React, Vue, Angular, etc.
2. **Choose Language**: JavaScript or TypeScript  
3. **Choose Example**: Basic viewer, magazine mode, forms, etc.
4. **Generate Project**: Combine framework template + example implementation

Example CLI usage:
```bash
npx create-nutrient-app my-project --framework react --language ts --example magazine-mode
```

## 🔄 Migration from `examples-old/`

The previous examples have been moved to `examples-old/` for reference. The new architecture provides:

- **Better separation of concerns**: Framework setup vs. Nutrient features
- **DRY principle**: Reusable examples across all frameworks  
- **CLI friendly**: Easy mix-and-match of framework + example
- **Maintainable**: Updates to examples benefit all frameworks

## 🤝 Contributing

When adding new examples:

1. **Keep framework-agnostic**: Examples should work with any framework
2. **Focus on Nutrient features**: Let framework templates handle the setup
3. **Document thoroughly**: Include README with usage examples
4. **Export clean API**: Simple functions for load/unload operations

When adding new frameworks:
1. **Follow naming convention**: `{framework}-{language}/`
2. **Include modern tooling**: Vite, TypeScript support, etc.
3. **Minimal setup**: Just enough to integrate with examples
4. **Consistent patterns**: Follow existing template structure