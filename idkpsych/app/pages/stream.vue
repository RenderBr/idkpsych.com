<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('content').order('weight', 'DESC').all()
})

useSeoMeta({
    title: "stream of consciousness",
    description: "a stream of all ideas featured on this site, generally psychology or behavior-related"
})
</script>

<template>
    <div>
        <h2 class="text-primary text-3xl tracking-wider font-bold">
            stream of consciousness
        </h2>

        <p class="text-secondary/60">
            where the conscious flows, and ideas intertwine. a stream, of all ideas free.
        </p>

        <hr class="text-primary/20 my-1" />

        <div class=" flex justify-center w-full">
            <article class="max-w-[108ch] text-[15px] leading-[1.6] tracking-tight
                            space-y-6 dark:text-secondary/80 antialiased
                            selection:bg-primary/20">
                <ContentRenderer v-for="item in page" :key="item.id" :value="item" />
            </article>
        </div>
    </div>
</template>

<style scoped lang="css">
article {
    text-rendering: optimizeLegibility;
    hanging-punctuation: first allow-end last;
    -webkit-font-smoothing: antialiased;
}

article :where(p) {
    margin-block: 1.25rem;
    text-wrap: pretty;
    hyphens: auto;
}
</style>