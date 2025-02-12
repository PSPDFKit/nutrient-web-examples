const ncp = require("ncp").ncp;
const fs = require("node:fs");

ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
  "./static/nutrient-viewer-lib",
  (err) => {
    err && console.error(err);
  },
);
