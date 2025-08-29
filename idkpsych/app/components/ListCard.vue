<template>
  <div
    class="p-3 bg-primary/5 my-3 rounded-xl border-primary/10 shadow-primary border-2"
  >
    <h3 :id="props.id" class="text-primary font-black font-mono text-xl">
      {{ props.title }}
    </h3>
    <p class="text-secondary/60 mb-2">{{ props.description }}</p>
    <div class="flex sm:flex-row flex-col gap-2 sm:gap-0 justify-between">
      <NuxtLink
        :to="`${props.url}`"
        class="text-primary hover:underline"
      >
        {{ props.actionText }}
      </NuxtLink>

      <div class="flex sm:flex-row flex-col gap-2 shrink">
        <ArticleTagBadge v-for="tag in props.tags" :key="tag" :text="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ListCardProperties {
  id?: string;
  title: string;
  description?: string;
  actionText?: string;
  url: string;
  tags?: string[];
}

const props = withDefaults(defineProps<ListCardProperties>(), {
  id: Math.random().toString(36).substring(2, 9),
  actionText: "read more",
  description: "No description available",
  tags: () => []
});
</script>
