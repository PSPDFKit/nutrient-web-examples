/// <reference types="next" />
/// <reference types="next/image-types/global" />

import type NutrientViewer from "@nutrient-sdk/viewer";

declare global {
  interface Window {
    // Nutrient Web SDK will be available on window.NutrientViewer once loaded via CDN
    NutrientViewer?: typeof NutrientViewer;
  }
}

export {};