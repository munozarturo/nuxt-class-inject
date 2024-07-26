export default defineNuxtConfig({
  modules: ["../src/module", "@nuxtjs/tailwindcss"],
  components: { global: true, dirs: ["~/components"] },
  classInject: {
    storageKey: "nuxt-class-inject",
    globalName: "__NUXT_CLASS_INJECT__",
    fallback: ["font-mono", "theme-paper"],
  },
  css: ["~/assets/main.css", "~/assets/scrollbar.css"],
  compatibilityDate: "2024-07-25",
});
