# Nutrient Web SDK example – Webpack

This example shows how to build a [Nutrient Web SDK](https://www.nutrient.io/web/) web application with [webpack](https://webpack.js.org/).

It demonstrates two ways to integrate [Nutrient Web SDK](https://www.nutrient.io/web/):

1. **CDN approach** (default): Loads the SDK directly from Nutrient’s Content Delivery Network (CDN)
2. **npm package approach**: Uses the Nutrient Web SDK version distributed as an npm package

## Prerequisites

- [Node.js](http://nodejs.org/)

## Getting started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/nutrient-web-examples.git
cd nutrient-web-examples/examples/webpack
```

Install the project dependencies with `npm`:

```bash
npm install
```

## Running the example

This example supports two different approaches for loading Nutrient Web SDK:

### Method 1: CDN approach (default)

Load the SDK directly from Nutrient’s CDN:

```bash
npm run start
```

For development mode:
```bash
npm run start:dev
```

### Method 2: npm package approach

To use the npm package bundled with webpack instead of CDN:

1. **Comment out the CDN script** in `src/index.html`:
   ```html
   <!-- Comment this line: -->
   <!-- <script src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.9.1/nutrient-viewer.js"></script> -->
   ```

2. **Run with npm flag**:
   ```bash
   npm run start:npm
   ```

   For development mode:
   ```bash
   npm run start:dev:npm
   ```

To view the sample PDF rendered in the viewer, open http://localhost:8080 (or http://localhost:3000 in dev mode) in your browser.

> The application will automatically load a sample PDF document when you open it. You can also upload your own PDF either using the `Upload a file` button or by dropping a PDF into the page.

We’ve included multiple sample PDF documents in the `assets` folder of this project for you to try!

### Differences between approaches

- **CDN** (default): Loads SDK from external CDN, smaller bundle size, requires internet connection
- **npm package**: Bundles Nutrient SDK with your application, larger bundle size, works offline

For more information, refer to our [JavaScript getting started](https://www.nutrient.io/sdk/web/getting-started/other-frameworks/javascript/) guide.

## webpack configuration file

The `webpack` configuration file is located at [./config/webpack.js](config/webpack.js).

## License

This software is licensed under a [modified BSD license](LICENSE).

## Support, issues and license questions

Nutrient offers support for customers with an active SDK license. Submit your query at — https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/sdk/try)? That’s great, we’re happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/contact-sales

## Contributing

Please ensure [you’ve signed our CLA](https://www.nutrient.io/guides/web/miscellaneous/contributing/) so we can accept your contributions.
