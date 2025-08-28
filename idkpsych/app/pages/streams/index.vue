<script setup lang="ts">
const { data: ideas } = await useAsyncData(() => queryCollection('content').all())

useSeoMeta({
    title: 'ideas',
    description: 'a list of all ideas written about on the site, with descriptions'
})

defineRouteRules({
    prerender: true
})
</script>

<template>
    <div>
        <PageTitle title="ideas" />

        <div class="max-w-3xl px-4">

            <div v-if="ideas && ideas.length">
                <div 
                    v-for="idea in ideas" :key="idea.id"
                    class="p-3 bg-primary/5 my-3 rounded-xl border-primary/10 shadow-primary border-2">
                    <h3 :id="idea.id" class="text-primary font-black font-mono text-xl">{{ idea.title }}</h3>
                    <p class="text-secondary/60 mb-2">{{ idea.description }}</p>
                    <div class="flex justify-between">
                        <NuxtLink :to="`/streams/${idea.slug}`" class="text-primary hover:underline">
                            read more
                        </NuxtLink>

                        <div class="flex">
                            <ArticleTagBadge v-for="tag in idea.tags" :key="tag">
                                {{ tag }}
                            </ArticleTagBadge>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>no ideas were available at the moment. please check back later. (something is likely wrong...)</p>
            </div>
        </div>
    </div>

</template>
