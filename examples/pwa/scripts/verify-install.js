// This file ensures that Nutrient is properly installed as an npm dependency
// and shows a meaningful error message if this is not the case.
//
// It acts as an additional safeguard for the example application and might not
// be necessary in your application.
try {
  require("@nutrient-sdk/viewer");
} catch (error) {
  if (!/cannot find module/i.test(error.message)) {
    process.exit(0);
  }
  console.log(
    `This application requires you to install Nutrient Web SDK manually using your unique customer or trial url.
For further instructions please refer to our online guide available at:

https://www.nutrient.io/guides/web/current/standalone/adding-to-your-project#toc_install-with-npm`,
  );
  process.exit(1);
}
