# PSPDFKit for Electron Example App

This example shows how to build a [PSPDFKit for Electron](https://www.nutrient.io/electron/) application with
[Electron](https://electronjs.org/).

This example uses node integration. If you're looking for an example with context isolation enabled, and node integration disabled, you can switch to the [`master` branch](https://github.com/PSPDFKit/pspdfkit-electron-example/tree/master).

## Prerequisites

- [Node.js](http://nodejs.org/)

## Support and Issues

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-electron-example.git
cd pspdfkit-electron-example
```

Install the project dependencies with `npm`:

```bash
npm install
```

**Important:** If you are using Windows, do not use PowerShell. Instead, use Microsoft’s [Developer Command Prompt for Visual Studio](https://docs.microsoft.com/en-us/dotnet/framework/tools/developer-command-prompt-for-vs).

## Running the Example

We are ready to launch the app! 🎉

```bash
npm run start
```

The Electron application will automatically start.

To open the developer tools inside Electron, uncomment the following line in `index.js`:

```js
// Open the DevTools.
mainWindow.webContents.openDevTools();
```

## What's in This Repository

This repository contains an example integration of [PSPDFKit for Electron](https://www.nutrient.io/electron). The project structure is influenced by the default Electron example app and comes with the following files:

| Filename          | Description                                                                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.js`    | The main entry point used to create the Electron windows. This file does not contain major changes, with the exception of a validation to make sure that PSPDFKit is properly installed. It is responsible for loading `src/index.html`. |
| `src/index.html`  | The main HTML entry point. It will set up a simple HTML structure and invoke the JavaScript that runs in the renderer thread: `src/renderer.js`.                                                                                         |
| `src/renderer.js` | This file is where we import PSPDFKit and set it up properly. We use it to extend Nutrient Web SDK with custom behavior.                                                                                                                 |

## Build Production Packages

We recommend using [`electron-packager`](https://github.com/electron-userland/electron-packager) or a similar solution to build the production bundles.

### Install `electron-packager`

```bash
npm install -g electron-packager
```

### Build Individual Packages

The following code will only work on macOS. For other platforms, please consult the [documentation](https://github.com/electron-userland/electron-packager#electron-packager) of `electron-packager`:

```bash
npm run package-mac-intel
npm run package-mac-apple (Apple Silicon)
npm run package-win (requires Wine: `brew cask install xquartz`, `brew install wine`)
npm run package-linux (requires `apt-get install libgconf-2-4` on target Linux)
```

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
