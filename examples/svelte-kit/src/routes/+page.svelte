<script lang="ts">
import { onDestroy, onMount } from "svelte";

const container: HTMLDivElement | null = null;
let NutrientViewer: typeof import("@nutrient-sdk/viewer").default | undefined;

onMount(async () => {
  NutrientViewer = (await import("@nutrient-sdk/viewer")).default;
  if (container && NutrientViewer) {
    NutrientViewer.load({
      container,
      // you may also specify a file in public directory e.g. /document.pdf
      document: "https://www.nutrient.io/downloads/pspdfkit-web-demo.pdf",
      // baseUrl tells the SDK where to load the assets from
      baseUrl: `${window.location.protocol}//${window.location.host}/${import.meta.env.PUBLIC_URL ?? ""}`,
    });
  }
});

onDestroy(() => {
  NutrientViewer?.unload(container);
});
</script>

<div class="container" bind:this={container}></div>

<style>
  /* we also need to set the container height and width */
  .container {
    height: 100vh;
    width: 100%;
  }
</style>
