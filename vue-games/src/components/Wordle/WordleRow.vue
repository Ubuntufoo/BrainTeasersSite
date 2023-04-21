<script setup>
import WordleLetterBox from "./WordleLetterBox.vue";

import { defineProps } from 'vue';
const props = defineProps({
  value: String,
  solution: String,
  submitted: Boolean,
})
</script>

<template>
  <div class="d-flex gap-2">
    <WordleLetterBox
    v-for="i in 5"
    :key="i"
    :letter="value[i-1]"
    />
  </div>
</template>
