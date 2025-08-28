<template>
  <div>
    <h2 class="text-primary text-3xl tracking-wider font-bold text-shadow-md" :class="{'mb-2': props.subtitle, 'mb-3': !props.subtitle}">
      {{ props.title }}
    </h2>

    <p v-if="props.subtitle" class="text-secondary/60 mb-4">
      {{ props.subtitle }}
    </p>


    <hr class="text-primary/20 mb-6">
  </div>
</template>

<script lang="ts" setup>
interface PageTitleProperties {
  title: string
  subtitle?: string
}

const props = defineProps<PageTitleProperties>();
</script>

<style></style>