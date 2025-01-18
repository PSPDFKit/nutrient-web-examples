## Overview

This is an internal vanilla JS example that integrates the Nutrient Web SDK in a very thin wrapper for testing purposes. It can be useful when it's required to rule out possible interference by other wrapping frameworks, like the Web catalog.

This example is not public.

## Usage

With a Nutrient Web SDK published version:

```bash
# Install dependencies, including Nutrient Web SDK
npm install
# Run the example
npm start
```

With the last locally built Nutrient Web SDK version:

```bash
# Locally build Web SDK
(cd ../../ && yarn build)
# Delete the current version installed in the example, if any
rm -rf node_modules/pspdfkit/dist
# Create package folder
mkdir -p node_modules/pspdfkit/dist
# Copy the last local build to the example node_modules folder
cp -R ../../dist/production/. node_modules/pspdfkit/dist
# Run the example
npm start
```

With the development build (no hot reloading, manual reloading is needed if the sources are modified):

```bash
# Run development build of Web SDK
(cd ../../ && yarn start)
# Run the example
npm start
```

The example can be accessed at [http://localhost:4111](http://localhost:4111).
