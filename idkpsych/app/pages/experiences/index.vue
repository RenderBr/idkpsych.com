<template>
  <div>
    <PageTitle title="experiences" />

    <div class="max-w-3xl px-4">
      <div v-if="experiences && experiences.length">
        <ListCard
          v-for="(experience, index) in experiences"
          :key="index"
          :action-text="'try it out'"
          :title="experience.title"
          :description="experience.description"
          :url="experience.url"
        />
      </div>
      <div v-else>
        <p>
          no experiences were available at the moment. please check back later.
          (something is likely wrong...)
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const experiences = [
  {
    title: 'reframe',
    description: 'a thought restructuring and awareness exercise',
    url: '/experiences/reframe'
  }
]
</script>

<style></style>
