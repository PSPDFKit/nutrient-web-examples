import "../styles/main.css";
import "../styles/viewer.css";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";
import {
  loadMagazineModeViewer,
  unloadMagazineModeViewer,
} from "../nutrient/magazine-mode/implementation";

// Get the app container
const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

// Create page content
app.innerHTML = `
  <div class="viewer-container">
    <nav class="viewer-nav">
      <a href="/" class="viewer-back-link">
        ← Back to Examples
      </a>
      <h2 class="viewer-title">Magazine Mode</h2>
      <span class="viewer-subtitle">
        Advanced magazine-style reader with double-page layout
      </span>
    </nav>
    <div id="viewer-content" class="viewer-content"></div>
  </div>
`;

// Load the viewer
const container = document.getElementById("viewer-content");

if (container) {
  loadNutrientViewer().then((nutrientViewer) => {
    loadMagazineModeViewer(nutrientViewer, container);
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    loadNutrientViewer().then((nutrientViewer) => {
      unloadMagazineModeViewer(nutrientViewer, container);
    });
  });
}
