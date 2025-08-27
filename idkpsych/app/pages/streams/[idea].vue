<script setup lang="ts">
const route = useRoute()
const slug = route.params.idea

const { data: idea } = await useAsyncData(() => queryCollection('content').path(`/streams/${slug}`).first())

useSeoMeta({
    title: idea.value?.title,
    description: idea.value?.description
})
</script>

<template>
    <div v-if="idea" class=" flex justify-center w-full">
        <article class="max-w-[108ch] text-[15px] leading-[1.6] tracking-tight
                            space-y-6 dark:text-secondary/80 antialiased
                            selection:bg-primary/20">
            <ContentRenderer :value="idea" />
        </article>
    </div>
    <div v-else>this specific stream wasn't found... maybe you can find it here? <NuxtLink
            class="text-primary hover:underline" to="/streams">Back to streams
        </NuxtLink>
    </div>
</template>
