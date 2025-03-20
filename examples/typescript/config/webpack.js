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
  // Example PDF.
  {
    from: "./assets/example.pdf",
    to: "./example.pdf",
  },
];

/**
 * webpack main configuration object.
 */
const config = {
  entry: path.resolve(__dirname, "../src/index.ts"),
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Automatically insert <script src="[name].js"><script> to the page.
    new HtmlWebpackPlugin({
      template: "./src/index.html",
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
