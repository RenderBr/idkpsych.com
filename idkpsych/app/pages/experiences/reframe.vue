<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ExperienceStage } from "../../../shared/types/experiences/ExperienceStage";
import reframeResources from "../../assets/json/reframe-resources.json";

useSeoMeta({
  title: "reframe negative thoughts",
  description: "learn to reframe your negative thoughts in a healthy way",
});

const stages: ExperienceStage[] = [];

const WRITING_STAGE = 0;
stages[WRITING_STAGE] = { title: "write down a negative thought you have" };

const REVIEW_STAGE = 1;
stages[REVIEW_STAGE] = { title: "your negative thought:" };

const REWRITE_STAGE = 2;
stages[REWRITE_STAGE] = {
  title: "rewrite your thought as if you were talking to a friend",
};

const COMPARISON_STAGE = 3;
stages[COMPARISON_STAGE] = {
  title: "compare your original thought with the re-written version",
};

const currentStageIndex = ref(0);
const currentStage = computed<ExperienceStage>(
  () => stages[currentStageIndex.value]!
);
const stageTitle = computed(() => currentStage.value.title);

const absoluteStatements = ref<string[]>([]);
const selfLabels = ref<string[]>([]);
const judgmentalPhrases = ref<string[]>([]);
const perfectionistWords = ref<string[]>([]);
const catastrophizingWords = ref<string[]>([]);
const negativeThought = ref("");
const negativeFeeling = ref(0);
const rewrittenThought = ref("");
const rewrittenThoughtInput = ref();
const rewrittenThoughtFeelingSlider = ref();
const rewrittenThoughtFeeling = ref(0);

const originalThoughtInput = ref();
const originalThoughtFeelingSlider = ref();

function submitNegativeThought(value: string) {
  negativeThought.value = value;
  negativeFeeling.value = originalThoughtFeelingSlider.value?.value || 0;
  currentStageIndex.value = REVIEW_STAGE;

  // normalize string for regex
  const normalizedValue = value.trim().toLowerCase();

  // check for absolute words
  absoluteStatements.value = addMatches(
    normalizedValue,
    reframeResources.absoluteWords
  );
  selfLabels.value = addMatches(normalizedValue, reframeResources.selfLabels);
  judgmentalPhrases.value = addMatches(
    normalizedValue,
    reframeResources.judgmentalPhrases
  );
  perfectionistWords.value = addMatches(
    normalizedValue,
    reframeResources.perfectionistWords
  );
  catastrophizingWords.value = addMatches(
    normalizedValue,
    reframeResources.catastrophizingWords
  );
}

function addMatches(text: string, words: string[]): string[] {
  const matches = new Set<string>();

  for (const original of words) {
    // 1) escape special chars first
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 2) then allow flexible whitespace between tokens in multi-word phrases
    const spaced = escaped.replace(/\s+/g, "\\s+");

    // 3) word-ish boundaries (support phrases + punctuation)
    const pattern = `(?<!\\w)${spaced}(?!\\w)`;
    const re = new RegExp(pattern, "i"); // single test is enough for presence

    if (re.test(text)) {
      // return the ORIGINAL dictionary term so your highlighter can find it
      matches.add(original);
    }
  }

  return Array.from(matches);
}

function submitRewrittenThought() {
  rewrittenThought.value = rewrittenThoughtInput.value?.userInput || '';
  rewrittenThoughtFeeling.value = rewrittenThoughtFeelingSlider.value?.value || 0;
  currentStageIndex.value = COMPARISON_STAGE;
}

function resetExperience() {
  currentStageIndex.value = WRITING_STAGE;
  negativeThought.value = '';
  rewrittenThought.value = '';
  negativeFeeling.value = 0;
  rewrittenThoughtFeeling.value = 0;
  absoluteStatements.value = [];
  selfLabels.value = [];
  judgmentalPhrases.value = [];
  perfectionistWords.value = [];
  catastrophizingWords.value = [];
  
  // Reset input components if they exist
  if (originalThoughtInput.value) {
    originalThoughtInput.value.userInput = '';
  }
  if (rewrittenThoughtInput.value) {
    rewrittenThoughtInput.value.userInput = '';
  }
  
  // Reset slider components if they exist
  if (originalThoughtFeelingSlider.value) {
    originalThoughtFeelingSlider.value.value = 0;
  }
  if (rewrittenThoughtFeelingSlider.value) {
    rewrittenThoughtFeelingSlider.value.value = 0;
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-6 w-full min-h-[60dvh] max-h-[80dvh] overflow-clip justify-center items-center align-middle"
  >
    <template v-if="currentStageIndex === WRITING_STAGE">
      <h1 class="text-4xl text-primary tracking-tight mb-4">
        {{ stageTitle }}
      </h1>
      <SubmitInput
        ref="originalThoughtInput"
        placeholder="i'm stupid and all my friends are smarter than me..."
      />

      <h3 class="mt-4 text-xl text-secondary/90">
        how does this thought make you feel?
      </h3>
      <SliderInput
        ref="originalThoughtFeelingSlider"
        :min="0"
        :max="100"
        :labels="[
          { text: 'awful', value: 0 },
          { text: 'bad', value: 25 },
          { text: 'neutral', value: 50 },
          { text: 'good', value: 75 },
          { text: 'amazing', value: 100 },
        ]"
      />

      <GlobalButton
        classes="bg-green-600 hover:bg-green-700 text-gray-800 font-bold"
        @click="
          () => submitNegativeThought(originalThoughtInput?.userInput || '')
        "
        >ok</GlobalButton
      >
    </template>

    <template v-if="currentStageIndex === REVIEW_STAGE">
      <h2 class="text-3xl tracking-wide italic">
        <ReframeHighlight
          :text="negativeThought"
          :words="[
            ...absoluteStatements.map((word) => ({
              text: word,
              bgColor: 'rgba(255, 165, 0, 0.3)',
            })),
            ...selfLabels.map((word) => ({
              text: word,
              bgColor: 'rgba(255, 192, 203, 0.3)',
            })),
            ...judgmentalPhrases.map((word) => ({
              text: word,
              bgColor: 'rgba(173, 216, 230, 0.3)',
            })),
            ...perfectionistWords.map((word) => ({
              text: word,
              bgColor: 'rgba(144, 238, 144, 0.3)',
            })),
            ...catastrophizingWords.map((word) => ({
              text: word,
              bgColor: 'rgba(255, 99, 71, 0.3)',
            })),
          ]"
        />
      </h2>

      <ReframeDiscussionPoint
        point="absolute statement"
        :amount="absoluteStatements.length"
        classes="text-orange-300"
      >
        absolute statements are statements that don't allow for nuance or
        flexibility in thinking. these include words like "always", "never", and
        "everyone" and can lead to feelings of hopelessness, frustration and
        what is known as "all or nothing"/"black and white" thinking by
        recognizing these words, you can work on reframing your thoughts to be
        more flexible and realistic.
      </ReframeDiscussionPoint>

      <ReframeDiscussionPoint
        point="self label"
        :amount="selfLabels.length"
        classes="text-pink-300"
      >
        self labels are negative labels we put on ourselves, often in response
        to failure or perceived inadequacy. these include phrases like "I'm a
        failure", "I'm unlovable", and "I'm not good enough". by recognizing
        these labels, you can work on reframing your thoughts to be more
        compassionate and understanding.
      </ReframeDiscussionPoint>

      <ReframeDiscussionPoint
        point="judgmental phrases"
        :amount="judgmentalPhrases.length"
        classes="text-blue-300"
      >
        judgmental phrases are expressions that convey criticism or negative
        evaluation of ourselves or others. these include phrases like "I can't
        believe I did that", "I'm so stupid", and "I'll never be able to do
        this". by recognizing these phrases, you can work on reframing your
        thoughts to be more constructive and kind.
      </ReframeDiscussionPoint>

      <ReframeDiscussionPoint
        point="perfectionist words"
        :amount="perfectionistWords.length"
        classes="text-green-300"
      >
        perfectionist words are terms that set unrealistically high standards
        for ourselves. these include words like "should", "must", and "have to".
        by recognizing these words, you can work on reframing your thoughts to
        be more forgiving and realistic.
      </ReframeDiscussionPoint>

      <ReframeDiscussionPoint
        point="catastrophizing words"
        :amount="catastrophizingWords.length"
        classes="text-red-300"
      >
        catastrophizing words are expressions that exaggerate the negative
        aspects of a situation. these include words like "ruined", "hopeless",
        and "disaster". by recognizing these words, you can work on reframing
        your thoughts to be more balanced and rational.
      </ReframeDiscussionPoint>

      <GlobalButton
        :disabled="currentStageIndex !== 1"
        @click="() => currentStageIndex++"
      >
        <div class="flex gap-2">
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </div>
      </GlobalButton>
    </template>

    <template v-if="currentStageIndex === REWRITE_STAGE">
      <h1 class="text-4xl text-primary tracking-tight mb-4">
        {{ stageTitle }}
      </h1>

      <h3>
        <ReframeHighlight
          :text="negativeThought"
          :words="[
            ...absoluteStatements.map((word) => ({
              text: word,
              bgColor: 'rgba(255, 165, 0, 0.3)',
            })),
            ...selfLabels.map((word) => ({
              text: word,
              bgColor: 'rgba(255, 192, 203, 0.3)',
            })),
            ...judgmentalPhrases.map((word) => ({
              text: word,
              bgColor: 'rgba(173, 216, 230, 0.3)',
            })),
            ...perfectionistWords.map((word) => ({
              text: word,
              bgColor: 'rgba(144, 238, 144, 0.3)',
            })),
            ...catastrophizingWords.map((word) => ({
              text: word,
              bgColor: 'rgba(255, 99, 71, 0.3)',
            })),
          ]"
        />
      </h3>

      <SubmitInput
        ref="rewrittenThoughtInput"
        placeholder="i'm learning and growing, and it's okay to make mistakes along the way..."
      />

      <h3 class="mt-4 text-xl text-secondary/90">
        how does this thought make you feel?
      </h3>
      <SliderInput
        ref="rewrittenThoughtFeelingSlider"
        :min="0"
        :max="100"
        :labels="[
          { text: 'awful', value: 0 },
          { text: 'bad', value: 25 },
          { text: 'neutral', value: 50 },
          { text: 'good', value: 75 },
          { text: 'amazing', value: 100 },
        ]"
      />

      <GlobalButton
        classes="bg-green-600 hover:bg-green-700 text-gray-800 font-bold"
        @click="submitRewrittenThought()"
        >ok</GlobalButton
      >
    </template>

    <template v-if="currentStageIndex === COMPARISON_STAGE">
      <h1 class="text-4xl text-primary tracking-tight mb-8">
        {{ stageTitle }}
      </h1>

      <div class="flex flex-col gap-8 w-full max-w-4xl">
        <div
          class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-400"
        >
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
            original thought:
          </h3>
          <p class="text-red-700 dark:text-red-300 italic text-lg mb-3">
            "{{ negativeThought }}"
          </p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-red-600 dark:text-red-400">feeling:</span>
            <div class="flex-1 bg-red-200 dark:bg-red-800 rounded-full h-2">
              <div
                class="bg-red-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: negativeFeeling + '%' }"
              />
            </div>
            <span class="text-sm font-medium text-red-700 dark:text-red-300">
              {{ negativeFeeling }}/100
            </span>
          </div>
        </div>

        <div class="flex justify-center">
          <svg
            class="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        <div
          class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border-l-4 border-green-400"
        >
          <h3
            class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3"
          >
            rewritten thought:
          </h3>
          <p class="text-green-700 dark:text-green-300 italic text-lg mb-3">
            "{{ rewrittenThought }}"
          </p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-green-600 dark:text-green-400">feeling:</span>
            <div class="flex-1 bg-green-200 dark:bg-green-800 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: rewrittenThoughtFeeling + '%' }"
              />
            </div>
            <span class="text-sm font-medium text-green-700 dark:text-green-300">
              {{ rewrittenThoughtFeeling }}/100
            </span>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h3
            class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3"
          >
            reflection:
          </h3>
          <p class="text-blue-700 dark:text-blue-300 text-base leading-relaxed">
            how does your new thought feel compared to the original thought? try
            saying each out loud, and notice any differences in your feelings or
            beliefs.
          </p>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
          <h3
            class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4"
          >
            feeling comparison:
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-purple-700 dark:text-purple-300">original feeling:</span>
              <span class="font-medium text-purple-800 dark:text-purple-200">{{ negativeFeeling }}/100</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-purple-700 dark:text-purple-300">rewritten feeling:</span>
              <span class="font-medium text-purple-800 dark:text-purple-200">{{ rewrittenThoughtFeeling }}/100</span>
            </div>
            <div class="flex items-center justify-between border-t border-purple-200 dark:border-purple-700 pt-2">
              <span class="text-sm font-medium text-purple-800 dark:text-purple-200">improvement:</span>
              <span
                :class="[
                  'font-bold',
                  rewrittenThoughtFeeling - negativeFeeling > 0
                    ? 'text-green-600 dark:text-green-400'
                    : rewrittenThoughtFeeling - negativeFeeling < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                ]"
              >
                {{ rewrittenThoughtFeeling - negativeFeeling > 0 ? '+' : '' }}{{ rewrittenThoughtFeeling - negativeFeeling }}/100
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-4 justify-center mt-4">
          <GlobalButton
            @click="resetExperience"
          >
            <div class="flex gap-2">
              try another thought
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.181m0-4.991v4.99"
                />
              </svg>
            </div>
          </GlobalButton>
        </div>
      </div>
    </template>
  </div>
</template>
