import type NutrientViewer from "@nutrient-sdk/viewer";

export function loadNutrientViewer(): typeof NutrientViewer {
  if (!window.NutrientViewer) {
    throw new Error("NutrientViewer not found on window object");
  }

  return window.NutrientViewer;
}
