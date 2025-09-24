const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  mode: "development",
  resolve: {
    extensions: [".js", ".elm"],
  },
  output: {
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: "elm-webpack-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
          to: "./nutrient-viewer-lib",
        },
        {
          from: "./assets/example.pdf",
          to: "./example.pdf",
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
  },
};
