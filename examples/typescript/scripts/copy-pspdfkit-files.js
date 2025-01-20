const ncp = require("ncp").ncp;

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit-lib",
  "./src/pspdfkit-lib",
  (err) => {
    err && console.error(err);
  },
);
ncp("./node_modules/pspdfkit/dist/pspdfkit.js", "./src/pspdfkit.js", (err) => {
  err && console.error(err);
});
