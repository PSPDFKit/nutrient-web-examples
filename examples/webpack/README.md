# Nutrient Web SDK Example – Webpack

This example shows how to build a [PSPDFKit for Web](https://www.nutrient.io/web/) web application with
[webpack](https://webpack.js.org/).

This example uses the Standalone version of [PSPDFKit for Web](https://www.nutrient.io/web/)
distributed as an npm package.

## Prerequisites

- [Node.js](http://nodejs.org/)

## Support, Issues and License Questions

PSPDFKit offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-web-example-webpack.git
cd pspdfkit-web-example-webpack
```

Install the project dependencies with `npm`:

```bash
npm install
```

## Running the Example

We are ready to launch the app! 🎉

```bash
npm run start
```

You can now open http://localhost:8080 in your browser and enjoy!

Upload a PDF either via the `Select File` button at top-left or by dropping a PDF into the page.

We put a sample PDF document in the `assets` folder of this project for you to try!

For further instructions please refer to our online guide available at
https://www.nutrient.io/guides/web/current/standalone/adding-to-your-project#toc_install-with-npm

### Development mode

To run the app in development mode run

```bash
npm run start:dev
```

## webpack configuration file

The `webpack` configuration file is located at [./config/webpack.js](config/webpack.js).

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so we can
accept your contributions.
