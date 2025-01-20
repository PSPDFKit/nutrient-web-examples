# PSPDFKit Web Example – ASP.NET

This example shows how to integrate [Nutrient Web SDK](https://www.nutrient.io/web/) into an ASP.NET backend app.

This example demonstrates both Standalone and Server backend.

## Prerequisites

- [.Net 6.0](https://dotnet.microsoft.com/en-us/download)
- A running Nutrient Document Engine (if you wish to use Server backend). Follow the [guide here](https://www.nutrient.io/guides/web/current/server-backed/setting-up-pspdfkit-server/).

## Support, Issues and License Questions

PSPDFKit offers support for customers with an active SDK license via https://www.nutrient.io/support/request/

Are you [evaluating our SDK](https://www.nutrient.io/try/)? That's great, we're happy to help out! To make sure this is fast, please use a work email and have someone from your company fill out our sales form: https://www.nutrient.io/sales/

## Getting Started

Clone the repo:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-server-example-asp-net.git
cd pspdfkit-server-example-asp-net
```

If Visual Studio informs you that some packages are missing then click on the "Restore" on the right.

## Standalone

After you have downloaded [Nutrient Web SDK](https://customers.www.nutrient.io/download/web/latest), place the contents of the dist directory in `/wwwroot/lib/pspdfkit/`.

Make sure your `/wwwroot/lib/pspdfkit/` folder contains the file `pspdfkit.js` and a `pspdfkit-lib` directory with library assets.

You can then build and run the example using `dotnet watch run` from the root folder.

You can also follow along with our [Getting Started guides](https://www.nutrient.io/getting-started/web/?frontend=aspnet&project=new-project&tool=terminal) for ASP.NET.

## Server

The Standalone example does not require a running Nutrient Document Engine but the Server example does.

Follow the [guide here](https://www.nutrient.io/guides/web/current/server-backed/setting-up-pspdfkit-server/) to set up a running Nutrient Document Engine.

Change the server address in `/Views/Shared/_Layout.cshtml` to the address of your Nutrient Document Engine.

Once you have a running server you will need to generate a JWT and place it in `/Views/Home/Index.cshtml`.

Read [this guide](https://www.nutrient.io/guides/web/current/server-backed/client-authentication/) for more information on this topic.

Upload a document to the server if you haven't already. Get the document id and set it in `/Views/Home/Index.cshtml`.

Build the solution and click on the green play icon in the toolbar starting the app and the index page will open in the browser you have specified to launch with.

## License

This software is licensed under a [modified BSD license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
