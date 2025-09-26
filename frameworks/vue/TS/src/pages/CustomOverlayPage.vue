<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
  loadCustomOverlaysViewer,
  unloadCustomOverlaysViewer,
} from "../nutrient/custom-overlays/implementation";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";

const containerRef = ref<HTMLDivElement | null>(null);

let nutrientViewer: Awaited<ReturnType<typeof loadNutrientViewer>> | null =
  null;

onMounted(async () => {
  const container = containerRef.value;

  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    nutrientViewer.unload(container);

    loadCustomOverlaysViewer(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }

  return () => {
    if (nutrientViewer && container) {
      unloadCustomOverlaysViewer(nutrientViewer, container);
    }
  };
});

onUnmounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    unloadCustomOverlaysViewer(NutrientViewer, container);
  }
});
</script>

<template>
  <div :style="{ height: '100vh', display: 'flex', flexDirection: 'column' }">
    <nav
      :style="{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }"
    >
      <router-link
        to="/"
        :style="{
          textDecoration: 'none',
          color: '#4A8FED',
          fontSize: '0.9rem',
        }"
      >
        ← Back to Examples
      </router-link>
      <h2 :style="{ margin: 0, fontSize: '1.1rem' }">Custom Overlays</h2>
      <span :style="{ fontSize: '0.9rem', color: '#666' }">
        Interactive overlays that appear on page clicks
      </span>
    </nav>

    <div ref="containerRef" :style="{ flex: 1, width: '100%' }" />
  </div>
</template>
