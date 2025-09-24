<template>
  <div class="pdf-container"></div>
</template>

<script>
let loadPromiseResolve;

const loadPromise = new Promise((resolve) => {
  loadPromiseResolve = resolve;
});

useHead({
  script: [
    {
      src: "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.3.0/nutrient-viewer.js",
      type: "text/javascript",
      onload: () => loadPromiseResolve(),
    },
  ],
});

/**
 * Nutrient Web SDK example component.
 */
export default {
  name: "Nutrient",
  /**
   * The component receives `pdfFile` as a prop, which is type of `String` and is required.
   */
  props: {
    pdfFile: {
      type: String,
      required: true,
    },
  },
  Nutrient: null,
  /**
   * We wait until the template has been rendered to load the document into the library.
   */
  mounted() {
    loadPromise.then(() => {
      this.loadNutrient().then((instance) => {
        this.$emit("loaded", instance);
      });
    });
  },
  /**
   * We watch for `pdfFile` prop changes and trigger unloading and loading when there's a new document to load.
   */
  watch: {
    pdfFile(val) {
      if (val) {
        this.loadNutrient();
      }
    },
  },
  /**
   * Our component has the `loadNutrient` method. This unloads and cleans up the component and triggers document loading.
   */
  methods: {
    async loadNutrient() {
      if (this.Nutrient) {
        this.Nutrient.unload(".pdf-container");
      }

      this.Nutrient = window.NutrientViewer;

      return window.NutrientViewer.load({
        document: this.pdfFile,
        container: ".pdf-container",
      });
    },
  },
};
</script>

<style scoped>
.pdf-container {
  height: 100vh;
}
</style>
