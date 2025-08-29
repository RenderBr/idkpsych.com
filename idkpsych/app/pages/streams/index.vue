<script setup lang="ts">
const { data: ideas } = await useAsyncData(() =>
  queryCollection("content").all()
);

useSeoMeta({
  title: "ideas",
  description:
    "a list of all ideas written about on the site, with descriptions",
});

defineRouteRules({
  prerender: true,
});
</script>

<template>
  <div>
    <PageTitle title="ideas" />

    <div class="max-w-3xl px-4">
      <div v-if="ideas && ideas.length">
        <ListCard
          v-for="idea in ideas"
          :id="idea.id"
          :key="idea.id"
          :title="idea.title"
          :description="idea.description"
          :url="`/streams/${idea.slug}`"
          :tags="idea.tags"
        />
      </div>
      <div v-else>
        <p>
          no ideas were available at the moment. please check back later.
          (something is likely wrong...)
        </p>
      </div>
    </div>
  </div>
</template>
