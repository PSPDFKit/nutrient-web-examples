module.exports = {
  globDirectory: "./dist/",
  globPatterns: ["**/{*.{js,json,css,html,mem,wasm},license-key}"],
  swDest: "./dist/serviceWorker.js",
  swSrc: "./src/serviceWorker.js",
  // Up to 30MB so that we can pre cache some of the heavier PSPDFKit assets
  maximumFileSizeToCacheInBytes: 3e7,
};
