const ncp = require("ncp").ncp;

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit-lib",
  "./public/assets/pspdfkit/pspdfkit-lib",
  (err) => {
    err && console.error(err);
  },
);

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit.js",
  "./public/assets/pspdfkit/pspdfkit.js",
  (err) => {
    err && console.error(err);
  },
);
