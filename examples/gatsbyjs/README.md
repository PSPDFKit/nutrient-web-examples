# Nutrient Web SDK Example – Gatsby.js

This example shows how to integrate [Nutrient Web SDK](https://www.nutrient.io/sdk/web/) into a GatsbyJS project.

## Prerequisites

- [Node.js](https://nodejs.org/) 24 (tested and used in CI)

## Development server dependency patch

`npm install` and `npm ci` apply the `webpack-dev-middleware` patch in `patches/` using `patch-package` when npm lifecycle scripts are enabled. Do not use `--ignore-scripts` for this example. It fixes incorrect response lengths for one-byte assets and first-byte ranges and closes unused streams on HEAD requests while retaining the traversal fix. Keep the patch until an upstream release fixes these responses and HEAD stream cleanup and the regression tests pass without it.

## Support, Issues and License Questions

Nutrient offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/nutrient-web-examples.git
cd nutrient-web-examples/examples/gatsbyjs
```

Install the project dependencies:

```bash
npm install
```

## Running the Example

We are ready to launch the app! 🎉

To run the app in development mode:

```bash
npm run start
```

To create a production build of the app and serve it:

```bash
npm run build
nom run serve
```

Enjoy 🍕

## Nutrient Web SDK assets

The example loads the Nutrient Web SDK assets from the CDN; no local asset copying is needed.

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
