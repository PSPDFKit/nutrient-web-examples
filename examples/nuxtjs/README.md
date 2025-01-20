# Nutrient Web SDK Example – Nuxt.js

This example shows how to integrate [Nutrient Web SDK](https://www.nutrient.io/web/) into a Nuxt.js app.

## Prerequisites

- [Node.js](http://nodejs.org/) version 18.12.0 or higher.
- Nutrient Web SDK (get your free trial [here](https://www.nutrient.io/try/))

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-web-example-nuxtjs.git
cd pspdfkit-web-example-nuxtjs
```

Install the project dependencies with `npm`:

```bash
npm install
```

## Nuxt.js Component

The Nuxt.js component which implements the Nutrient Web SDK integration is included at `pages/index.vue` with the rest of the example.

In order to make the Nutrient Web SDK's library available for building, we have to copy the `pspdfkit-lib/` directory from `node_modules/pspdfkit/dist/` into the `public/js/` directory. This is done in the `package.json` `postinstall` script.

## Running the Example

We are ready to launch the app! 🎉

```bash
# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm start

# generate static project
npm run generate
```

You can now open http://localhost:3000 in your browser and enjoy!

## Support, Issues and License Questions

PSPDFKit offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
