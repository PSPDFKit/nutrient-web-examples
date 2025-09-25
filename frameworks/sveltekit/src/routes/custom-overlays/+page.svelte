<script>
import { onDestroy, onMount } from "svelte";
import { loadCustomOverlays } from "../../lib/examples/custom-overlays/implementation.js";
import { loadNutrientViewer } from "../../lib/utils/loadNutrientViewer.js";

let container;
let nutrientViewer;

onMount(async () => {
  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    // Unload any existing instance
    nutrientViewer.unload(container);

    await loadCustomOverlays(nutrientViewer, container);
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
  <title>Custom Overlays - Nutrient Web SDK SvelteKit Example</title>
</svelte:head>

<div class="custom-overlays-container">
  <nav class="custom-overlays-nav">
    <a href="/" class="custom-overlays-back-link">
      ← Back to Examples
    </a>
    <h2 class="custom-overlays-title">Custom Overlays</h2>
    <span class="custom-overlays-subtitle">
      Interactive overlays that appear on page clicks
    </span>
  </nav>

  <div bind:this={container} class="custom-overlays-content"></div>
</div>

<style>
  .custom-overlays-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .custom-overlays-nav {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .custom-overlays-back-link {
    text-decoration: none;
    color: #4a8fed;
    font-size: 0.9rem;
  }

  .custom-overlays-title {
    margin: 0;
    font-size: 1.1rem;
  }

  .custom-overlays-subtitle {
    font-size: 0.9rem;
    color: #666;
  }

  .custom-overlays-content {
    flex: 1;
    width: 100%;
    position: relative;
    min-height: 400px;
  }
</style>