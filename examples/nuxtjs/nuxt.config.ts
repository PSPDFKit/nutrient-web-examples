export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      title: "Nutrient Web SDK - Nuxt Example",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          src: "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.10.0/nutrient-viewer.js",
          type: "text/javascript",
        },
      ],
    },
  },

  compatibilityDate: "2025-12-15",
});
