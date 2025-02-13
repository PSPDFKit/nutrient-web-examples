import { sveltekit } from "@sveltejs/kit/vite";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: "node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib",
          dest: "static/",
        },
      ],
      hook: "buildStart",
    }),
    sveltekit(),
  ],
});
