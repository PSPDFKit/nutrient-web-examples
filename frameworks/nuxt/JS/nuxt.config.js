export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Nutrient Web SDK - Nuxt.js Examples",
      meta: [
        {
          name: "description",
          content:
            "Explore different ways to integrate Nutrient Web SDK with Nuxt.js",
        },
      ],
      script: [
        {
          src: "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.7.0/nutrient-viewer.js",
          defer: true,
        },
      ],
    },
  },
});
