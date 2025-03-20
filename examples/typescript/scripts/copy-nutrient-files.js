const ncp = require("ncp").ncp;

ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
  "./src/nutrient-viewer-lib",
  (err) => {
    err && console.error(err);
  },
);
ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer.js",
  "./src/nutrient-viewer.js",
  (err) => {
    err && console.error(err);
  },
);
