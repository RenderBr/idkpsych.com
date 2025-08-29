<template>
  <p>
    <span v-for="(segment, index) in processedText" :key="index">
      <span v-if="segment.isHighlight" :style="{ backgroundColor: segment.bgColor }">
        {{ segment.text }}
      </span>
      <span v-else>{{ segment.text }}</span>
    </span>
  </p>
</template>

<script lang="ts" setup>
interface WordToHighlight {
  text: string;
  bgColor: string;
}

interface TextSegment {
  text: string;
  isHighlight: boolean;
  bgColor?: string;
}

function processText(text: string, wordsToHighlight: WordToHighlight[]): TextSegment[] {
  if (!wordsToHighlight.length) {
    return [{ text, isHighlight: false }];
  }

  // Create regex patterns for all words to highlight
  const patterns = wordsToHighlight.map(word => ({
    regex: new RegExp(`(?<!\\w)${word.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, "\\s+")}(?!\\w)`, 'gi'),
    bgColor: word.bgColor,
    originalText: word.text
  }));

  const segments: TextSegment[] = [];
  let lastIndex = 0;

  // Find all matches across all patterns
  const allMatches: Array<{ index: number; length: number; bgColor: string; text: string }> = [];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        bgColor: pattern.bgColor,
        text: match[0]
      });
    }
  });

  // Sort matches by index and remove overlaps
  allMatches.sort((a, b) => a.index - b.index);

  // Filter out overlapping matches (keep the first one)
  const filteredMatches = allMatches.filter((match, index, arr) => {
    if (index === 0) return true;
    const prevMatch = arr[index - 1];
    return prevMatch ? match.index >= prevMatch.index + prevMatch.length : true;
  });

  // Process matches and create segments
  filteredMatches.forEach(match => {
    // Add text before the match
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        isHighlight: false
      });
    }

    // Add the highlighted match
    segments.push({
      text: match.text,
      isHighlight: true,
      bgColor: match.bgColor
    });

    lastIndex = match.index + match.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      isHighlight: false
    });
  }

  return segments;
}

interface ReframeHighlightProperties {
  text: string;
  words: WordToHighlight[];
}

const props = defineProps<ReframeHighlightProperties>();
const processedText = computed(() => processText(props.text, props.words));
</script>

<style>

</style>