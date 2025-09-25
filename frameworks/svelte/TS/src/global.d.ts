import type NutrientViewer from "frameworks/next/ts/node_modules/@nutrient-sdk/viewer/dist";

declare global {
  interface Window {
    NutrientViewer: typeof NutrientViewer;
  }
}
