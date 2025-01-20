const ncp = require("ncp").ncp;
const fs = require("node:fs");

if (!fs.existsSync("./public/js")) {
  fs.mkdirSync("./public/js");
}

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit-lib",
  "./public/js/pspdfkit-lib",
  (err) => {
    err && console.error(err);
  },
);

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit.js",
  "./public/js/pspdfkit.js",
  (err) => {
    err && console.error(err);
  },
);
