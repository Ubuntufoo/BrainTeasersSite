<script setup>
import Keyboard from "simple-keyboard";
import { defineEmits, defineProps, ref, onMounted, watch } from "vue";

const emit = defineEmits(["onKeyPress"]);

const props = defineProps({
  guessedLetters: Object,
})

const keyboard = ref(null);

const onKeyPress = (button) => {
  emit("onKeyPress", button);
}

onMounted(() => {
  keyboard.value = new Keyboard("simple-keyboard", {
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{enter} z x c v b n m {bksp}",
      ],
    },
    onKeyPress: onKeyPress,
  });
});

watch(
  () => props.guessedLetters,
  (guessedLetters) => {
    keyboard.value.addButtonTheme(
      guessedLetters.miss.join(" "),
      "miss"
    );
    keyboard.value.addButtonTheme(
      guessedLetters.found.join(" "),
      "found"
    );
    keyboard.value.addButtonTheme(
      guessedLetters.hint.join(" "),
      "hint"
    );
  },
  { deep: true }
);
</script>

<template>
  <div id="down-size" class="simple-keyboard"></div>
</template>


<style>
@media (max-width: 576px) {
  #down-size {
    font-size: 0.7em;
  }
}

div.miss {
  background-color: rgba(255, 0, 0, 0.598) !important;
  color: white;
}

div.found {
  background-color: RGB(25, 135, 84) !important;
  color: white;
}

div.hint:not(.found) {
  background-color: RGB(255, 193, 7) !important;
  color: white;
}
</style>