<script>
import { onDestroy, onMount } from "svelte";
import { loadBasicViewer } from "../../lib/examples/basic-viewer/implementation.js";
import { loadNutrientViewer } from "../../lib/utils/loadNutrientViewer.js";

let container;
let nutrientViewer;

onMount(async () => {
  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    // Unload any existing instance
    nutrientViewer.unload(container);

    await loadBasicViewer(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }
});

onDestroy(() => {
  if (nutrientViewer && container) {
    nutrientViewer.unload(container);
  }
});
</script>

<svelte:head>
  <title>Basic Viewer - Nutrient Web SDK SvelteKit Example</title>
</svelte:head>

<div class="basic-viewer-container">
  <nav class="basic-viewer-nav">
    <a href="/" class="basic-viewer-back-link">
      ← Back to Examples
    </a>
    <h2 class="basic-viewer-title">Basic Viewer</h2>
    <span class="basic-viewer-subtitle">
      Simple PDF viewing with standard controls
    </span>
  </nav>

  <div bind:this={container} class="basic-viewer-content"></div>
</div>

<style>
  .basic-viewer-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .basic-viewer-nav {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .basic-viewer-back-link {
    text-decoration: none;
    color: #4a8fed;
    font-size: 0.9rem;
  }

  .basic-viewer-title {
    margin: 0;
    font-size: 1.1rem;
  }

  .basic-viewer-subtitle {
    font-size: 0.9rem;
    color: #666;
  }

  .basic-viewer-content {
    flex: 1;
    width: 100%;
    position: relative;
    min-height: 400px;
  }
</style>