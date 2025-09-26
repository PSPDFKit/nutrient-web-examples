<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { loadNutrientViewer } from "../nutrient/loadNutrientViewer";
import {
  loadMagazineViewer,
  unloadMagazineViewer,
} from "../nutrient/magazine-mode/implementation";

const containerRef = ref<HTMLDivElement | null>(null);

let nutrientViewer: Awaited<ReturnType<typeof loadNutrientViewer>> | null =
  null;

onMounted(async () => {
  const container = containerRef.value;

  if (!container) return;

  try {
    nutrientViewer = await loadNutrientViewer();

    nutrientViewer.unload(container);

    loadMagazineViewer(nutrientViewer, container);
  } catch (error) {
    console.error("Failed to load Nutrient Viewer:", error);
  }

  return () => {
    if (nutrientViewer && container) {
      unloadMagazineViewer(nutrientViewer, container);
    }
  };
});

onUnmounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    unloadMagazineViewer(NutrientViewer, container);
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
      <h2 :style="{ margin: 0, fontSize: '1.1rem' }">Magazine Mode</h2>
      <span :style="{ fontSize: '0.9rem', color: '#666' }">
        Double-page layout with custom toolbar and fullscreen support
      </span>
    </nav>

    <div ref="containerRef" :style="{ flex: 1, width: '100%' }" />
  </div>
</template>
