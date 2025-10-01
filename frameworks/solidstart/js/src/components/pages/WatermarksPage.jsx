import { A } from "@solidjs/router";
import { onCleanup, onMount } from "solid-js";
import { loadNutrientViewer } from "~/nutrient/loadNutrientViewer.js";
import {
  loadWatermarksViewer,
  unloadWatermarksViewer,
} from "~/nutrient/watermarks/implementation.js";
import "./BasicViewerPage.css";

export default function WatermarksPage() {
  let containerRef;
  let nutrientViewer = null;

  onMount(async () => {
    if (!containerRef) return;

    nutrientViewer = await loadNutrientViewer();

    if (containerRef && nutrientViewer) {
      unloadWatermarksViewer(nutrientViewer, containerRef);
      loadWatermarksViewer(nutrientViewer, containerRef);
    }
  });

  onCleanup(() => {
    if (nutrientViewer && containerRef) {
      unloadWatermarksViewer(nutrientViewer, containerRef);
    }
  });

  return (
    <div class="basic-viewer-container">
      <nav class="basic-viewer-nav">
        <A href="/" class="basic-viewer-back-link">
          ← Back to Examples
        </A>
        <h2 class="basic-viewer-title">Watermarks</h2>
        <span class="basic-viewer-subtitle">
          Add watermarks to PDFs using JavaScript
        </span>
      </nav>

      <div ref={containerRef} class="basic-viewer-content" />
    </div>
  );
}
