const ncp = require("ncp").ncp;

ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
  "./public/assets/nutrient/nutrient-viewer-lib",
  (err) => {
    err && console.error(err);
  },
);

ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer.js",
  "./public/assets/nutrient/nutrient-viewer.js",
  (err) => {
    err && console.error(err);
  },
);
