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

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import {
  loadMagazineViewer,
  unloadMagazineViewer,
} from "../examples/magazine-mode/implementation.js";

const containerRef = ref(null);

onMounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    loadMagazineViewer(NutrientViewer, container);
  }
});

onUnmounted(() => {
  const container = containerRef.value;
  const { NutrientViewer } = window;

  if (container && NutrientViewer) {
    unloadMagazineViewer(NutrientViewer, container);
  }
});
</script>
