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

      // google
      GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
      GOOGLE_TOKEN_URI: process.env.GOOGLE_TOKEN_URI,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
      GOOGLE_USER_INFO_URI: process.env.GOOGLE_USER_INFO_URI,
      GOOGLE_SCOPES: process.env.GOOGLE_SCOPES,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
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
