# Nutrient Web SDK Example – Gatsby.js

This example shows how to integrate [Nutrient Web SDK](https://www.nutrient.io/sdk/web/) into a GatsbyJS project.

## Prerequisites

- [Node.js](http://nodejs.org/)

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

The project `.npmrc` limits new dependency resolution to releases published before October 30, 2026.
When updating dependencies, advance this cutoff to a date at least seven days before the update.

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

In order to make the example work, the Nutrient assets need to be copied from their original location in `./node_modules/@nutrient-sdk/viewer/dist` to `./static`. This is done automatically from a postinstall script in located in `./scripts/copy-nutrient-files.js`.

In case copying the files fails, you can copy them manually:

- Copy `./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer.js` to `./static/nutrient-viewer.js`.
- Copy `./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib/` to `./static/nutrient-viewer-lib/`.

That's it!

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.

## Development server security

Gatsby 5.16.1 requires `webpack-dev-middleware` 5.3.4, which has no patched release within its supported major version.
The default public path `/` meets the [upstream workaround for CVE-2026-76844](https://github.com/webpack/webpack-dev-middleware/security/advisories/GHSA-g84c-rxfj-3j2c).
If you set `GATSBY_WEBPACK_PUBLICPATH`, end its value with `/`.
The dependency alert remains open until Gatsby supports a patched middleware version.
