<script setup lang="ts">
interface TagColor {
  color: { background: string; text: string }
}
interface ArticleTagBadgeProperties {
  text: string;
}

const props = defineProps<ArticleTagBadgeProperties>();

const { data, status } = await useFetch<TagColor>('/api/color-tag', {
  query: { tag: props.text }
})

// make a reactive style object
const badgeStyle = computed(() => {
  if (status.value !== 'success' || !data.value) return undefined
  return {
    backgroundColor: data.value.color.background,
    color: data.value.color.text
  } as const
})
</script>

<template>
  <span
    :style="badgeStyle"
    class="bg-gray-100 text-gray-800 scale-3d hover:scale-105 shadow-sm text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm flex justify-center items-center dark:bg-gray-700 dark:text-gray-300"
  >
    {{ props.text }}
  </span>
</template>
