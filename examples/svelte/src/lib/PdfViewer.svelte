<script lang="ts">
import type * as Nutrient from "@nutrient-sdk/viewer";
import { onDestroy, onMount } from "svelte";

interface Props {
  document: string;
}

const { document }: Props = $props();
let container: HTMLDivElement;
let instance: Nutrient.Instance | null = null;
let currentDocument = "";

async function loadDocument(doc: string) {
  if (!container || !window.NutrientViewer || doc === currentDocument) return;

  if (instance) {
    window.NutrientViewer.unload(container);
    instance = null;
  }

  currentDocument = doc;
  instance = await window.NutrientViewer.load({
    container,
    document: doc,
    useCDN: true,
  });
}

onMount(() => {
  loadDocument(document);
});

$effect(() => {
  // Only react to document changes after initial mount
  if (container && document && document !== currentDocument) {
    loadDocument(document);
  }
});

onDestroy(() => {
  if (container && instance) {
    window.NutrientViewer?.unload(container);
  }
});
</script>

<div bind:this={container} class="pdf-container"></div>

<style>
  .pdf-container {
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
