## Nutrient Web SDK Example — React.js

Nutrient Web SDK is a powerful PDF SDK that enables you to view, annotate, sign, and edit PDF documents in your web applications. This repository demonstrates how to seamlessly integrate PSPDFKit with a React application.

## Features

- **View and Annotate PDFs** — Easily view and annotate PDF documents within your web app.
- **Real-Time Collaboration** — Sync document edits, text highlights, and annotations across Android, iOS, and web devices in real time.
- **Electronic and Digital Signatures** — Certified, encrypted, and secure document signing workflows.
- **Forms** — Create, fill, capture, and submit PDF form data.
- **Cross-Platform** — Consistent behavior across different web browsers.

## Prerequisites

- [Node.js][]

## Support and Issues

Are you evaluating our SDK? That’s great, and we’re happy to help! Feel free to contact our [Sales team][sales] to schedule a demo.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-web-example-react.git
cd pspdfkit-web-example-react
```

Install the project dependencies with npm:

```bash
npm install
```

If you need more information, refer to our [Getting Started on Web][getting started] guide.

## Running the Example

Now you’re ready to launch the app! 🎉

Run the app in development mode:

```bash
npm start
```

Create a production build of the app and serve it:

```bash
npm run build
npx serve -s build
```

Enjoy! 🍕

## React Component

The React component that implements the Nutrient Web SDK integration can be found at `src/components/PdfViewerComponent`.

To make the files above available, copy them from the `node_modules/pspdfkit/dist` folder using the script at `scripts/copy-pspdfkit-files`.

## License

This software is licensed under a [modified BSD license](LICENSE).

## FAQ

### How Do I Integrate PSPDFKit with My Existing React App?

Follow [this guide][react existing project] to integrate our Web SDK into your project.

### Where Can I Find More Documentation?

We have extensive documentation with [developer guides for React][react guides] that show you how to add document functionality to React apps.

## Useful Resources

- [How to Convert HTML to PDF Using React][]
- [How to Build a React.js PDF Viewer with react-pdf][]

## Contributing

Please ensure you’ve signed [our CLA][cla] so that we can accept your contributions.

[node.js]: http://nodejs.org/
[sales]: https://www.nutrient.io/sdk/contact-sales
[getting started]: https://www.nutrient.io/getting-started/web/?frontend=react&download=npm&integration=module
[react existing project]: https://www.nutrient.io/getting-started/web/?frontend=react&project=existing-project
[react guides]: https://www.nutrient.io/guides/web/react/
[how to convert html to pdf using react]: https://www.nutrient.io/blog/how-to-convert-html-to-pdf-using-react/
[how to build a react.js pdf viewer with react-pdf]: https://www.nutrient.io/blog/how-to-build-a-reactjs-pdf-viewer-with-react-pdf/
[cla]: https://www.nutrient.io/guides/web/current/miscellaneous/contributing/
