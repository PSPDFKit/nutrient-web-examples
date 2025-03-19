/**
 * webpack configuration file used to build both a development and production
 * version of the app.
 *
 * The production version is built in the `./dist` folder. When building the
 * development mode it also starts a web server at http://localhost:8080
 *
 * This configuration file creates two main bundles:
 *
 * - vendor.js - contains external libraries (including nutrient-viewer.js).
 * - app.js - contains the application code.
 *
 * It also copies the WASM/ASM and CSS files from the npm package folder, since
 * `NutrientViewer.load` loads them relative to the application execution path.
 */

const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * Determine whether we are in development mode.
 *
 * $ NODE_ENV=development webpack --config config/webpack.js
 */
const isDev = process.env.NODE_ENV === "development";

const filesToCopy = [
  // Nutrient files.
  {
    from: "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
    to: "./nutrient-viewer-lib",
  },
  // Application CSS.
  {
    from: "./src/index.css",
    to: "./index.css",
  },
  // Assets directory.
  {
    from: "./assets",
    to: "./assets",
  },
];

/**
 * webpack main configuration object.
 */
const config = {
  entry: {
    // Creates an `app.js` bundle which contains the application code.
    app: path.resolve("./src/index.js"),
  },

  // Configure Compilation Mode
  mode: isDev ? "development" : "production",

  output: {
    path: path.resolve("./dist"),
    publicPath: "/",
    // [name] is the bundle name from above.
    filename: "[name].js",
  },

  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")],
  },

  plugins: [
    // Automatically insert <script src="[name].js"><script> to the page.
    new HtmlWebpackPlugin({
      template: path.resolve("./src/index.html"),
      chunks: ["vendor", "app"],
    }),

    // Copy the WASM/ASM and CSS files to the `output.path`.
    new CopyWebpackPlugin({
      patterns: filesToCopy,
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        // Creates a `vendor.js` bundle which contains external libraries (including nutrient-viewer.js).
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  devServer: {
    port: 3000,
  },
};

module.exports = config;
