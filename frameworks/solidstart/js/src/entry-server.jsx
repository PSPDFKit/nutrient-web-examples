// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>Nutrient Web SDK - SolidStart JavaScript Demo</title>
          {assets}
          {/* Nutrient Web SDK CDN */}
          {/* biome-ignore lint/style/useSelfClosingElements: script tags cannot be self-closing */}
          <script src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.7.0/nutrient-viewer.js"></script>
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
