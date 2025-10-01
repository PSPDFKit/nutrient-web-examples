import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        basicViewer: resolve(__dirname, "basic-viewer.html"),
        magazineMode: resolve(__dirname, "magazine-mode.html"),
        customOverlays: resolve(__dirname, "custom-overlays.html"),
      },
    },
  },
});
