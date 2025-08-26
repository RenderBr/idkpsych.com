// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content', '@nuxt/image'],
  pages: true,
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  content:{
    renderer: {
      anchorLinks: { h1: true, h2: true, h3: true },
      alias: {
        h1: 'Heading1',
        p: 'Paragraph',
      }
    }
  }
})