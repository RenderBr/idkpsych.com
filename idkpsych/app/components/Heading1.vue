<template>
    <h2 @click="gotoStream" ref="anchor" class="text-xl mt-2 mb-4 font-bold text-primary relative hover:underline cursor-pointer">
        <slot />
    </h2>
</template>

<script lang="ts" setup>
const anchor = ref();

function gotoStream() {
    // navigate to stream
    const streamId = anchor.value.id;
    const streamLink = `/streams/${streamId}`;
    window.location.href = streamLink;
}
</script>

<style lang="css" scoped></style>