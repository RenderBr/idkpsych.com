<template>
    <p>
      <span v-for="(word, index) in textWords" :key="index"><span :style="{ backgroundColor: getWordBgColor(word) }">{{ word }}</span>&nbsp;</span>
    </p>
</template>

<script lang="ts" setup>
interface WordToHighlight {
  text: string;
  bgColor: string;
}

function getWordBgColor(word: string): string {
  const foundWord = props.words.find(w => w.text === word);
  return foundWord ? foundWord.bgColor : 'transparent';
}

interface ReframeHighlightProperties {
  text: string;
  words: WordToHighlight[];
}

const props = defineProps<ReframeHighlightProperties>();
const textWords = props.text.split(' ');
</script>

<style>

</style>