// vite.config.js

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
const path = require("node:path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["pspdfkit"],
  },
});
