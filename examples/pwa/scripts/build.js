const ncp = require("ncp").ncp;
const rimraf = require("rimraf");

// We make sure that all prior artifacts are deleted.
rimraf.sync("./dist");

// When building the final release artifacts, we copy all relevant files into
// the dist/ folder of the roof application.
ncp("./src", "./dist", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  ncp("./config", "./dist/config");

  ncp(
    "./node_modules/@nutrient-sdk/viewer/dist/",
    "./dist/scripts/vendor/",
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      ncp(
        "./node_modules/workbox-sw/build/",
        "./dist/scripts/vendor/workbox-sw/",
      );
      ncp("./node_modules/idb/lib/idb.js", "./dist/scripts/vendor/idb.js");
    },
  );
});
