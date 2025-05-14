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
      apiBase: "https://starfish-app-obbt2.ondigitalocean.app",
      // google
      GOOGLE_AUTH_URI: "https://accounts.google.com/o/oauth2/auth",
      GOOGLE_TOKEN_URI: "https://accounts.google.com/o/oauth2/token",
      GOOGLE_REDIRECT_URI: "http://localhost:3000/google-redirect",
      GOOGLE_USER_INFO_URI: "https://www.googleapis.com/oauth2/v1/userinfo",
      GOOGLE_SCOPES:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      GOOGLE_CLIENT_ID:
        "817105455030-9g38nih55o1ir34693fq4gam5vph3sn3.apps.googleusercontent.com",
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
