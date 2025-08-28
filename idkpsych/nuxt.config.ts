// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxt/eslint',
  ],
  pages: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  site: {
    url: 'https://idkpsych.com',
    name: 'idkpsych',
  },
  content: {
    renderer: {
      anchorLinks: { h1: true, h2: true, h3: true },
      alias: {
        h1: 'MarkdownHeading1',
        p: 'MarkdownParagraph',
        li: 'MarkdownListItem'
      }
    }
  },
  experimental: {
    inlineRouteRules: true,
  },
})