<!-- eslint-disable no-unused-vars -->
<script setup>
import WordleLetterBox from "./WordleLetterBox.vue";

import { defineProps, ref, watch } from 'vue';
const props = defineProps({
  value: Array,
  solution: String,
  submitted: Boolean,
});

const colors = ref(["", "", "", "", ""]);

watch(
  () => props.submitted,

  async (submitted, prevSubmitted) => {
    if (props.submitted) {
      let s = props.solution;
      let v = props.value.join("");

      let temp = ["gray", "gray", "gray", "gray", "gray"];
      let letterPool = [];
      for (let i = 0; i < 5; i++) {
        if (s.charAt(i) == v.charAt(i)) {
          // if the value matches
          temp[i] = "green";
        } else {
          letterPool.push(s.charAt(i));
        }
      }
      for (let i = 0; i < 5; i++) {
        if (temp[i] == "gray") {
          if (letterPool.indexOf(v.charAt(i)) != -1) {
            letterPool.splice(letterPool.indexOf(v.charAt(i)), 1);
            temp[i] = "yellow";
          }
        }
        colors.value[i] = temp[i];
        await new Promise((resolve) => setTimeout(resolve, 500));
}
    }
  }
)
</script>

<template>
  <div class="d-flex gap-1">
    <WordleLetterBox
    v-for="i in 5"
    :key="i"
    :letter="value[i-1]"
    :color="colors[i-1]"
    />
  </div>
</template>
