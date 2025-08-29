<script lang="ts" setup>
interface ButtonProperties {
    disabled?: boolean;
    classes?: string;
}

const props = withDefaults(defineProps<ButtonProperties>(), {
    disabled: false,
    classes: 'bg-secondary/20 hover:bg-secondary/30'
});


const emit = defineEmits<{
    (e: 'click'): void
}>();

function submit() {
    if(buttonRef.value?.disabled) {
        return;
    }

    emit("click");
}

const buttonRef = ref<HTMLButtonElement>();

</script>

<template>
    <button 
        ref="buttonRef"
        class="p-2 rounded-xl px-4 hover:outline-0 focus:outline-0 shadow-sm" 
        :class="{
            [props.classes]: !props.disabled,
            'opacity-50 cursor-not-allowed': props.disabled,
            'cursor-pointer': !props.disabled
        }"
        type="button"
        :disabled="props.disabled"
        @click="submit"
    >
        <slot  />
    </button>
</template>