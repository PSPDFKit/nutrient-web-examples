import type NutrientViewer from "@nutrient-sdk/viewer";
import { A } from "@solidjs/router";
import { onCleanup, onMount } from "solid-js";
import {
  loadCustomOverlaysViewer,
  unloadCustomOverlaysViewer,
} from "../nutrient/custom-overlays/implementation";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";
import "./BasicViewerPage.css";

function CustomOverlaysPage() {
  let containerRef: HTMLDivElement | undefined;
  let nutrientViewer: typeof NutrientViewer | null = null;

  onMount(async () => {
    if (!containerRef) return;

    nutrientViewer = await loadNutrientViewer();

    if (containerRef && nutrientViewer) {
      unloadCustomOverlaysViewer(nutrientViewer, containerRef);
      loadCustomOverlaysViewer(nutrientViewer, containerRef);
    }
  });

  onCleanup(() => {
    if (nutrientViewer && containerRef) {
      unloadCustomOverlaysViewer(nutrientViewer, containerRef);
    }
  });

  return (
    <div class="basic-viewer-container">
      <nav class="basic-viewer-nav">
        <A href="/" class="basic-viewer-back-link">
          ← Back to Examples
        </A>
        <h2 class="basic-viewer-title">Custom Overlays</h2>
        <span class="basic-viewer-subtitle">
          Interactive overlays that appear on page clicks
        </span>
      </nav>

      <div ref={containerRef} class="basic-viewer-content" />
    </div>
  );
}

export default CustomOverlaysPage;
