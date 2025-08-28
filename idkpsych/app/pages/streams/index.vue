<script setup lang="ts">
const { data: ideas } = await useAsyncData(() => queryCollection('content').all())

useSeoMeta({
    title: 'ideas',
    description: 'a list of all ideas written about on the site, with descriptions'
})

defineRouteRules({
    isr: 3600,
})
</script>

<template>
    <div class="max-w-3xl px-4">
        <h2 class="text-primary text-3xl tracking-wider font-bold">
            ideas...
        </h2>

        <hr class="text-primary/20 my-1">

        <div v-if="ideas && ideas.length">
            <div v-for="idea in ideas" :key="idea.id" class="p-3 bg-primary/5 my-3 rounded-xl border-primary/10 shadow-primary border-2">
                <h3 :id="idea.id" class="text-primary font-black font-mono text-xl">{{ idea.title }}</h3>
                <p class="text-secondary/60 mb-2">{{ idea.description }}</p>
                <NuxtLink :to="`/streams/${idea.slug}`" class="text-primary hover:underline">read more</NuxtLink>
            </div>
        </div>
        <div v-else>
            <p>no ideas were available at the moment. please check back later. (something is likely wrong...)</p>
        </div>
    </div>
</template>
