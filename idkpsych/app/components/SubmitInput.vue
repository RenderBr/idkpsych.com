<script lang="ts" setup>
interface SubmitInputProperties {
    placeholder: string;
}

const props = defineProps<SubmitInputProperties>();


const emit = defineEmits<{
    (e: 'submit', value: string): void
}>();

function submit() {
    if(userInput.value.trim() === ''){
        return;
    }

    emit("submit", userInput.value);
}

const userInput = ref("");

defineExpose({ userInput })

</script>

<template>
    <input 
        v-model="userInput" 
        class="bg-secondary/20 p-4 rounded-xl w-[50%] hover:outline-0 focus:outline-0 shadow-sm" type="text"
        :placeholder="props.placeholder"
        @keydown.enter="submit()">
</template>