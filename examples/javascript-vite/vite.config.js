import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

// Check if we should use npm package instead of CDN
const useNpm = process.env.USE_NPM === "true";

export default defineConfig({
  plugins: useNpm
    ? [
        copy({
          targets: [
            {
              // Nutrient Web SDK requires its assets to be in the `public` directory so it can load them at runtime.
              src: "node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
              dest: "public/",
            },
          ],
          hook: "buildStart", // Copy assets when build starts.
        }),
      ]
    : [],
  build: {
    // Generate source maps for easier debugging
    sourcemap: true,
    rollupOptions: {
      // When using CDN, mark Nutrient as external to prevent bundling
      external: useNpm ? [] : ["@nutrient-sdk/viewer"],
      output: {
        // Configure globals for external dependencies (CDN mode)
        globals: useNpm
          ? {}
          : {
              "@nutrient-sdk/viewer": "NutrientViewer",
            },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

