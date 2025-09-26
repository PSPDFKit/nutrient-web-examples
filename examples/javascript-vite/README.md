# Nutrient Web SDK - JavaScript + Vite example

This example demonstrates how to integrate Nutrient Web SDK into a JavaScript application using Vite as the build tool.

## Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/PSPDFKit/nutrient-web-examples.git
   cd nutrient-web-examples/examples/javascript-vite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### CDN installation (recommended)

The example uses CDN by default, loading Nutrient Web SDK from Nutrient’s Content Delivery Network (CDN).

#### Development mode:
```bash
npm run dev
```

#### Production build:
```bash
npm run build
npm run preview
```

### Local npm package installation

To use the locally installed npm package instead of CDN:

#### Development mode:
```bash
npm run dev:npm
```

#### Production build:
```bash
npm run build:npm
npm run preview:npm
```

### Differences between approaches

- **CDN** (default): Loads SDK from external CDN, smaller bundle size, requires internet connection
- **npm package**: Bundles Nutrient SDK with your application, larger bundle size, works offline

For more information, refer to our [JavaScript getting started](https://www.nutrient.io/sdk/web/getting-started/other-frameworks/javascript/) guide.

## License

This software is licensed under a [modified BSD license](LICENSE).

## Support, issues and license questions

Nutrient offers support for customers with an active SDK license. Submit your query at — https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/sdk/try)? That’s great, we’re happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/contact-sales

## Contributing

Please ensure [you’ve signed our CLA](https://www.nutrient.io/guides/web/miscellaneous/contributing/) so we can accept your contributions.
