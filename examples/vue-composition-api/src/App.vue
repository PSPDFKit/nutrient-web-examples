<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";

const containerRef = useTemplateRef("container");
let PSPDFKit: typeof import("pspdfkit").default | undefined;

onMounted(async () => {
  PSPDFKit = (await import("pspdfkit")).default;
  const container = containerRef.value;

  if (container && PSPDFKit) {
    PSPDFKit.load({
      container,
      // you may also specify a file in public directory e.g. /document.pdf
      document: "https://www.nutrient.io/downloads/pspdfkit-web-demo.pdf",
      // baseUrl tells the SDK where to load the assets from
      baseUrl: `${window.location.protocol}//${window.location.host}/${import.meta.env.PUBLIC_URL ?? ""}`,
    });
  }
});

onUnmounted(() => {
  const container = containerRef.value;

  if (container && PSPDFKit) {
    PSPDFKit.unload(container);
  }
});
</script>

<template>
  <div ref="container" class="container" />
</template>

<style scoped>
/* we also need to set the container height and width */
.container {
  width: 100vw;
  height: 100vh;
}
</style>
