const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/js")
  .postCss("resources/css/app.css", "public/css", [
    //
  ]);
mix.copy(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer.js",
  "./public/assets/nutrient/nutrient-viewer.js",
);
mix.copy(
  "./node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
  "./public/assets/nutrient/nutrient-viewer-lib",
);
