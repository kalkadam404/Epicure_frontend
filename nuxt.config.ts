import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@pinia/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "nuxt-aos",
    "@nuxtjs/i18n",
  ],
  runtimeConfig: {
    public: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    },
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET_KEY: process.env.STRIPE_WEBHOOK_SECRET_KEY,
  },
  i18n: {
    locales: [
      { code: "EN", name: "English", file: "en.json" },
      { code: "RU", name: "Русский", file: "ru.json" },
      { code: "KZ", name: "Қазақша", file: "kz.json" },
    ],
    defaultLocale: "RU",
  },
});
