<template>
  <div class="pdf-container"></div>
</template>

<script>
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
    this.loadNutrient().then((instance) => {
      this.$emit("loaded", instance);
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
      import("@nutrient-sdk/viewer")
        .then((PSPDFKit) => {
          this.Nutrient = PSPDFKit;
          PSPDFKit.unload(".pdf-container");
          return PSPDFKit.load({
            document: this.pdfFile,
            container: ".pdf-container",
            baseUrl: "http://localhost:3000/js/",
          });
        })
        .catch((error) => {
          console.error(error);
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
