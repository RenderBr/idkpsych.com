<script lang="ts" setup>
interface SliderInputLabel {
  text: string;
  value: number;
}

interface SliderInputProperties {
  labels: SliderInputLabel[];
  min?: number;
  max?: number;
}

const props = defineProps<SliderInputProperties>();
const value = ref(props.max ? props.max / 2 : 0);
defineExpose({ value });
</script>

<template>
  <div>
    <input
      v-model="value"
      :min="props.min"
      :max="props.max"
      class="w-[50vw] h-2 p-3 rounded-xl bg-secondary/20 appearance-none cursor-pointer accent-green-500"
      type="range"
    >

    <div class="w-[50vw] flex justify-between px-3 mt-2 text-sm text-gray-500">
      <div
        v-for="label in props.labels"
        :key="label.value"
        class="text-center"
        :style="`width: ${100 / (props.labels.length - 1)}%`"
      >
        {{ label.text }}
      </div>
    </div>
  </div>
</template>

<style lang="css"></style>
