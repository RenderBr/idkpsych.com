<script setup lang="ts">
export interface ReframeDiscussionPoint {
  point: string;      // e.g., "absolute statement"
  amount: number;     // e.g., 2
  classes?: string;   // optional extra classes (e.g., "text-amber-500")
}

const props = withDefaults(defineProps<ReframeDiscussionPoint>(), {
  classes: 'text-secondary/90'
});

// allow parent to control if desired: v-model:open
const open = defineModel<boolean>('open', { default: false });

const label = computed(() => {
  // simple pluralization with special case for 1
  const p = props.point.trim();
  if (props.amount === 1) return `${props.amount} ${p}`;
  // naive pluralization fallback
  const plural =
    p.endsWith('y') && !/[aeiou]y$/i.test(p)
      ? p.slice(0, -1) + 'ies'
      : p.endsWith('s')
        ? p + 'es'
        : p + 's';
  return `${props.amount} ${plural}`;
});
</script>

<template>
  <div v-if="props.amount > 0" class="my-1 max-w-[20vw]">
    <button
      type="button"
      class="group inline-flex justify-center items-center gap-2 rounded-lg px-3 py-2
             ring-1 ring-primary/20 hover:ring-primary/40
             bg-primary/5 hover:bg-primary/10
             transition-all duration-200
             text-left"
      :aria-expanded="open"
      @click="open = !open"
    >
      <strong
        class="font-semibold tracking-wide
               group-hover:text-secondary
              "
        :class="props.classes"
      >
        {{ label }}
      </strong>

      <!-- chevron -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        class="size-5 shrink-0 transition-transform duration-200
               text-secondary/60 group-hover:text-secondary/80"
        :class="open ? 'rotate-180' : 'rotate-0'"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
      </svg>
    </button>

    <!-- details body -->
    <transition name="dp-collapse">
      <div v-show="open" class="mt-2 ms-1 ps-2 border-l border-primary/20">
        <!-- put your explanation text/content here -->
        <slot>
          <p class="text-secondary/70 text-sm leading-6">
            <slot />
          </p>
        </slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* simple height fade without measuring content JS */
.dp-collapse-enter-active,
.dp-collapse-leave-active {
  transition: opacity .18s ease, transform .18s ease;
}
.dp-collapse-enter-from,
.dp-collapse-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
