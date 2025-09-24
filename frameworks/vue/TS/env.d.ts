/// <reference types="vite/client" />

import NutrientViewer from "@nutrient-sdk/viewer";

declare global {
  interface Window {
    // Nutrient Web SDK will be available on window.NutrientViewer once loaded via CDN
    NutrientViewer?: typeof NutrientViewer;
  }
}

export {};