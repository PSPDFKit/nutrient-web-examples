const CopyPlugin = require("copy-webpack-plugin");
const path = require("node:path");

// Exclude @nutrient-sdk/viewer from the client-side bundle to optimize performance
// and avoid potential conflicts with the script loaded in layout.js
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(
              __dirname,
              "node_modules/@nutrient-sdk/viewer/dist",
            ),
            to: path.resolve(__dirname, "public"),
            info: () => ({ minimized: true }),
            force: true,
          },
        ],
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
