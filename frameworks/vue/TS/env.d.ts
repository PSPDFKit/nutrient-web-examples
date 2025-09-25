/// <reference types="vite/client" />

import type NutrientViewer from "frameworks/next/ts/node_modules/@nutrient-sdk/viewer/dist";

declare global {
  interface Window {
    // Nutrient Web SDK will be available on window.NutrientViewer once loaded via CDN
    NutrientViewer?: typeof NutrientViewer;
  }
}
