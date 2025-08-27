import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
    collections: {
        content: defineCollection(
            asSitemapCollection(
                {
                    type: 'page',
                    source: '**/*.md',
                    schema: z.object({
                        title: z.string().min(2).max(100),
                        description: z.string().max(500).optional(),
                        date: z.date().optional(),
                        weight: z.number().min(0).optional()
                    })
                }))
    }
})