<script setup lang="ts">
import type { ExperienceStage } from '../../../shared/types/experiences/ExperienceStage';
import reframeResources from "../../assets/json/reframe-resources.json";

useSeoMeta({
    title: 'reframe negative thoughts',
    description: 'learn to reframe your negative thoughts in a healthy way'
})

const stages: ExperienceStage[] = [
  { title: "write down a negative thought you have" },
  { title: "your negative thought:" }
]


const currentStageIndex = ref(0);
const currentStage = computed<ExperienceStage>(() => (stages[currentStageIndex.value]!));
const stageTitle = computed(() => currentStage.value.title);

const absoluteStatements = ref<string[]>([]);
const selfLabels = ref<string[]>([]);
const negativeThought = ref("");

function submitNegativeThought(value: string) {
    negativeThought.value = value;
    currentStageIndex.value = 1;

    // check for absolute words
    reframeResources.absoluteWords.forEach(word => {
        if (value.includes(word)) {
            absoluteStatements.value.push(word);
        }
    });

    reframeResources.selfLabels.forEach(word => {
        if (value.includes(word)) {
            selfLabels.value.push(word);
        }
    })
}

</script>



<template>
    <div class="flex flex-col gap-6 w-full min-h-[80vh] overflow-clip justify-center items-center align-middle">
        <template v-if="currentStageIndex === 0">
            <h1 class="text-4xl text-primary tracking-tight mb-4">
                {{ stageTitle }}
            </h1>
            <SubmitInput 
                placeholder="i'm stupid and all my friends are smarter than me..."
                @submit="submitNegativeThought" />
        </template>

        <template v-if="currentStageIndex === 1">
            <h2 class="text-3xl tracking-wide italic">
                <ReframeHighlight 
                    :text="negativeThought" 
                    :words="[
                        ...absoluteStatements.map(word => ({ text: word, bgColor: 'rgba(255, 165, 0, 0.3)' })),
                        ...selfLabels.map(word => ({ text: word, bgColor: 'rgba(255, 192, 203, 0.3)' }))
                    ]" />
            </h2>

            <ReframeDiscussionPoint
                point="absolute statement"
                :amount="absoluteStatements.length"
                classes="text-orange-300">
            absolute statements are statements that don't allow for nuance or flexibility in thinking. 
            these include words like "always", "never", and "everyone" and can lead to feelings of hopelessness, frustration and what is known as "all or nothing"/"black and white" thinking
            by recognizing these words, you can work on reframing your thoughts to be more flexible and realistic.
            </ReframeDiscussionPoint>

            <ReframeDiscussionPoint
                point="self label"
                :amount="selfLabels.length"
                classes="text-pink-300"
            />
        </template>
    </div>

</template>
