import type NutrientViewer from "@nutrient-sdk/viewer";
import { A } from "@solidjs/router";
import { onCleanup, onMount } from "solid-js";
import {
  loadBasicViewer,
  unloadBasicViewer,
} from "~/nutrient/basic-viewer/implementation";
import { loadNutrientViewer } from "~/nutrient/loadNutrientViewer";
import "./BasicViewerPage.css";

export default function BasicViewerPage() {
  let containerRef: HTMLDivElement | undefined;
  let nutrientViewer: typeof NutrientViewer | null = null;

  onMount(async () => {
    if (!containerRef) return;

    nutrientViewer = await loadNutrientViewer();

    if (containerRef && nutrientViewer) {
      unloadBasicViewer(nutrientViewer, containerRef);
      loadBasicViewer(nutrientViewer, containerRef);
    }
  });

  onCleanup(() => {
    if (nutrientViewer && containerRef) {
      unloadBasicViewer(nutrientViewer, containerRef);
    }
  });

  return (
    <div class="basic-viewer-container">
      <nav class="basic-viewer-nav">
        <A href="/" class="basic-viewer-back-link">
          ← Back to Examples
        </A>
        <h2 class="basic-viewer-title">Basic Viewer</h2>
        <span class="basic-viewer-subtitle">
          Simple PDF viewing with standard controls
        </span>
      </nav>

      <div ref={containerRef} class="basic-viewer-content" />
    </div>
  );
}
