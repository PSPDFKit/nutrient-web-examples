export function loadNutrientViewer() {
  if (!window.NutrientViewer) {
    throw new Error("NutrientViewer not found on window object");
  }

  return window.NutrientViewer;
}
