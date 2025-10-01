import type NutrientViewer from "@nutrient-sdk/viewer";
import { A } from "@solidjs/router";
import { onCleanup, onMount } from "solid-js";
import { loadNutrientViewer } from "~/nutrient/loadNutrientViewer";
import {
  loadMagazineModeViewer,
  unloadMagazineModeViewer,
} from "~/nutrient/magazine-mode/implementation";
import "./BasicViewerPage.css";

export default function MagazineModePage() {
  let containerRef: HTMLDivElement | undefined;
  let nutrientViewer: typeof NutrientViewer | null = null;

  onMount(async () => {
    if (!containerRef) return;

    nutrientViewer = await loadNutrientViewer();

    if (containerRef && nutrientViewer) {
      unloadMagazineModeViewer(nutrientViewer, containerRef);
      loadMagazineModeViewer(nutrientViewer, containerRef);
    }
  });

  onCleanup(() => {
    if (nutrientViewer && containerRef) {
      unloadMagazineModeViewer(nutrientViewer, containerRef);
    }
  });

  return (
    <div class="basic-viewer-container">
      <nav class="basic-viewer-nav">
        <A href="/" class="basic-viewer-back-link">
          ← Back to Examples
        </A>
        <h2 class="basic-viewer-title">Magazine Mode</h2>
        <span class="basic-viewer-subtitle">
          Advanced magazine-style reader with double-page layout
        </span>
      </nav>

      <div ref={containerRef} class="basic-viewer-content" />
    </div>
  );
}
