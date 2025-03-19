const ncp = require("ncp").ncp;
const fs = require("node:fs");

if (!fs.existsSync("./public/js")) {
  fs.mkdirSync("./public/js");
}

ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
  "./public/js/nutrient-viewer-lib",
  (err) => {
    err && console.error(err);
  },
);

ncp(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer.js",
  "./public/js/nutrient-viewer.js",
  (err) => {
    err && console.error(err);
  },
);
