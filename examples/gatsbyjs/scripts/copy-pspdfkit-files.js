const ncp = require("ncp").ncp;
const fs = require("node:fs");

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit-lib",
  "./static/pspdfkit-lib",
  (err) => {
    err && console.error(err);
  },
);
