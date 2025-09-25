export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      title: "Nutrient Web SDK - Nuxt.js TypeScript Examples",
      meta: [
        {
          name: "description",
          content:
            "Explore different ways to integrate Nutrient Web SDK with Nuxt.js and TypeScript",
        },
      ],
      script: [
        {
          src: "https://cdn.nutrient.io/1.6.0/nutrient-viewer.js",
          defer: true,
        },
      ],
    },
  },
});
