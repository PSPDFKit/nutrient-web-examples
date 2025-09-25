import type NutrientViewer from "frameworks/next/ts/node_modules/@nutrient-sdk/viewer/dist";

export function loadNutrientViewer(): typeof NutrientViewer {
  if (!window.NutrientViewer) {
    throw new Error("NutrientViewer not found on window object");
  }

  return window.NutrientViewer;
}
