// https://nuxt.com/docs/api/configuration/nuxt-config
import { queryCollection } from "@nuxt/content/nitro";
import tailwindcss from "@tailwindcss/vite";
import { useAsyncData } from "nuxt/app";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/robots',
  ],
  pages: true,
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  site: {
    url: 'https://idkpsych.com',
    name: 'idkpsych',
  },
  content:{
    renderer: {
      anchorLinks: { h1: true, h2: true, h3: true },
      alias: {
        h1: 'Heading1',
        p: 'Paragraph',
        li: 'ListItem'
      }
    }
  },
})