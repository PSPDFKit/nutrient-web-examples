<template>
  <div class="pdf-container"></div>
</template>

<script>
export default {
  name: "PSPDFKit",
  /**
   * The component receives `pdfFile` prop which is type of String and required
   */
  props: {
    pdfFile: {
      type: String,
      required: true,
    },
  },
  /**
   * We wait until the template has been rendered to load the document into the library.
   */
  mounted() {
    this.loadPSPDFKit().then((instance) => {
      this.$emit("loaded", instance);
    });
  },
  /**
   * We watch for `pdfFile` prop changes and trigger unloading and loading when there's a new document to load.
   */
  watch: {
    pdfFile(val) {
      if (val) {
        this.loadPSPDFKit();
      }
    },
  },
  /**
   * Our component has `loadPSPDFKit` method, this unloads and cleanup the component and triggers document loading.
   */
  methods: {
    async loadPSPDFKit() {
      PSPDFKit.unload(".pdf-container");
      return PSPDFKit.load({
        // access the pdfFile from props
        document: this.pdfFile,
        container: ".pdf-container",
      });
    },
  },

  /**
   * Clean up when the component is unmounted; so, it is ready to load another document.
   */
  beforeUnmount() {
    PSPDFKit.unload(".pdf-container");
  },
};
</script>


<style scoped>
.pdf-container {
  height: 100vh;
}
</style>
