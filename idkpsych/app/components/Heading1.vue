<template>
    <h2 @click="copyLink" ref="anchor" class="text-xl mt-2 mb-4 font-bold text-primary relative group cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-5 self-center absolute -left-8 top-4 -translate-y-1/2 opacity-0 group-hover:opacity-100  text-primary/40">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>


        <slot />
    </h2>
</template>

<script lang="ts" setup>
const anchor = ref();

function copyLink() {
    // copy link to clipboard, which is current path + anchor.id. ensure we are not already at an anchor though
    const link = window.location.href.split('#')[0] + '#' + anchor.value.id;
    navigator.clipboard.writeText(link);

    // take user to anchor
    anchor.value.scrollIntoView({ behavior: 'smooth' });

    // change url
    history.pushState(null, '', link);
}
</script>

<style lang="css" scoped></style>