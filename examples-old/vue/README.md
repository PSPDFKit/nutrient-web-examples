# Nutrient Web SDK Example – Vue

This example shows how to integrate [PSPDFKit for Web](https://www.nutrient.io/web/) into a Vue.js app.

## Prerequisites

- [Node.js](http://nodejs.org/)
- Nutrient Web SDK (get your free trial [here](https://www.nutrient.io/try/))

## Support, Issues and License Questions

Nutrient offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/nutrient-web-examples.git
cd nutrient-web-examples/examples/vue
```

Install the project dependencies with `npm`:

```bash
npm install
```

## Vue Component

The Vue component which implements the Nutrient Web SDK integration is included at `src/App.vue` with the rest of the example.

In order to make the Nutrient Web SDK's library available for building, we have to copy the `nutrient-viewer-lib/` directory from `node_modules/@nutrient-sdk/viewer/dist/` into the `public/js/` directory. This is done in the `package.json` script `verify-installation` which is executed by `serve`.

## Running the Example

We are ready to launch the app! 🎉

```bash
npm run build
npm run serve
```

You can now open http://localhost:4173 in your browser and enjoy!

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
