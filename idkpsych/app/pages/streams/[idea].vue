<script setup lang="ts">
const route = useRoute()
const slug = route.params.idea

const { data: idea } = await useAsyncData(() => queryCollection('content').path(`/streams/${slug}`).first())

useSeoMeta({
    title: idea.value?.title,
    description: idea.value?.description
})

defineRouteRules({
    prerender: true
})
</script>

<template>
    <div v-if="idea" class=" flex justify-center w-full">
        <ArticleWrapper>
            <ContentRenderer :value="idea" />
        </ArticleWrapper>
    </div>
    <div v-else>this specific stream wasn't found... maybe you can find it here? <NuxtLink
            class="text-primary hover:underline" to="/streams">back to streams.
        </NuxtLink>
    </div>
</template>
