// src/global.d.ts
import NutrientViewer from "@nutrient-sdk/viewer";

declare global {
  interface Window {
    // Nutrient Web SDK will be available on window.NutrientViewer once loaded.
    NutrientViewer?: typeof NutrientViewer;
  }
}