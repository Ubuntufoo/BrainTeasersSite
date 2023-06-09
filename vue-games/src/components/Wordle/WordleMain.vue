<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, reactive, ref, computed, defineProps } from "vue";
import axios from 'axios';
import SimpleKeyboard from "./WordleKeyboard.vue"
import WordleRow from "./WordleRow.vue";
import WordleGameOver from "./WordleGameOver.vue";

const props = defineProps({
  user: String
});
const initialState = {
  solution: "",
  guesses: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  },
};

const resetGame = () => {
  state.solution = initialState.solution;
  state.guesses = initialState.guesses;
  state.currentGuessIndex = initialState.currentGuessIndex;
  state.guessedLetters = initialState.guessedLetters;
};

const state = reactive(initialState);

const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] && state.guesses[state.currentGuessIndex - 1].join("") === state.solution,
);
const lostGame = computed(
  () => !wonGame.value && state.currentGuessIndex >= 6
);
const computedClass = computed(() => {
  let className = '';
  if (wonGame.value || lostGame.value) {
    className = 'opacity-25';
  }
  return className;
});
const handleInput = (key) => {
  if (state.currentGuessIndex >= 6 || wonGame.value) {
    return;
  }
  let currentGuess = state.guesses[state.currentGuessIndex]
  if (key == "{enter}") {
    if (currentGuess.length >= 5 && !currentGuess.includes("")) {
      state.currentGuessIndex++;
      for (var i = 0; i < 5; i++) {
        let c = currentGuess[i];
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
          state.guesses[state.currentGuessIndex][i] = c;
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
    }
  } else if (key == "{bksp}") {
    for (let i = currentGuess.length - 1; i >= 0; i--) {

      if (currentGuess[i] == "") {

        continue;
      } else if (state.guessedLetters.found.includes(currentGuess[i]) && currentGuess[i] == state.solution[i]) {

        if (state.guesses[state.currentGuessIndex - 1].reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2 && state.solution.split("").reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2) {

          continue;
        } else if (state.guesses[state.currentGuessIndex - 1].reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) <= 1 && state.solution.split("").reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2) {
          if (currentGuess.reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2) {

            currentGuess[i] = "";
            break;
          }

          continue;
        } else {

          continue;
        }
      } else {

        currentGuess[i] = "";
        break;
      }
    }
  } else if (key.length == 1) {
    const alphaRegex = /[a-zA-Z]/;
    if (alphaRegex.test(key)) {
      for (let i = 0; i < 5; i++) {
        if (!currentGuess[i]) {
          currentGuess[i] = key;
          break;
        }
      }
    }
  }
};

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    let key =
      e.key == "Enter"
        ? "{enter}"
        : e.key == "Backspace"
          ? "{bksp}"
          : e.key.toLowerCase();
    handleInput(key);
  });
  window.addEventListener("keydown", (e) => {
    const button = document.querySelector(`.hg-button[data-skbtn="${e.key.toLowerCase()}"]`);
    if (button) {
      button.style.backgroundColor = "#b3b3b3";
    }
  });
  window.addEventListener("keyup", (e) => {
    const button = document.querySelector(`.hg-button[data-skbtn="${e.key.toLowerCase()}"]`);
    if (button) {
      button.style.backgroundColor = "";
    }
  });
});
axios.get('https://api.datamuse.com/words?sp=?????')
  .then(response => {
    const randomWord = response.data[Math.floor(Math.random() * response.data.length)].word;
    state.solution = randomWord;
  })
  .catch(error => {
    console.error(error);
  });
</script>

<template>
  <div class="container position-relative d-flex justify-content-center my-5 pb-5">
    <div :class="computedClass">
      <WordleRow v-for="(guess, i) in state.guesses" :key="i" :value="guess" :solution="state.solution"
        :submitted="i < state.currentGuessIndex" />
      <SimpleKeyboard @onKeyPress="handleInput" :guessedLetters="state.guessedLetters" />
    </div>
    <Transition>
      <div v-if="state.guesses[0][0] == false" id="game-title" class="display-1 text-warning text-nowrap">Wordle +</div>
    </Transition>
    <transition>
      <div v-if="wonGame || lostGame" class="position-absolute top-50 start-50 translate-middle text-center">
        <WordleGameOver v-if="wonGame" :class="'text-primary'" :content="'Congratulations!'" />
        <WordleGameOver v-if="lostGame" :class="'text-primary'" :content="'No more guesses. Play again!'" />
        <button class="btn btn-primary btn-lg fw-bold" @click="resetGame"><a class="text-decoration-none text-white"
            onclick="location.reload();">Play Again</a></button>
      </div>
    </transition>
  </div>
</template>

<style lang="css" scoped>
#game-title {
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.simple-keyboard {
  margin-top: 10px;
  background-color: #6c6c6c;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px #d2d2d2;
  font-size: 1.3em;
  width: fit-content;
}

.simple-keyboard :deep(.hg-row) {
  display: flex;
  justify-content: center;
  padding: 0 10px 0 10px;
}

.simple-keyboard :deep(.hg-button) {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2em;
  height: 2em;
  margin: 0.2em;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
  user-select: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s ease-in-out;
}

.simple-keyboard :deep(.hg-button:hover) {
  background-color: #e2e2e2;
}

.simple-keyboard :deep(.hg-functionBtn) {
  background-color: #c9c9c9;
}

.simple-keyboard :deep(.hg-functionBtn:hover) {
  background-color: #b3b3b3;
}

.simple-keyboard :deep(.hg-button-enter) {
  width: 5em;
}

.simple-keyboard :deep(.hg-standardBtn) {
  width: 1.8em;
}

.simple-keyboard :deep(.hg-button-bksp) {
  width: 5em;
}

.simple-keyboard :deep(.hg-button:hover),
.simple-keyboard :deep(.hg-button:active) {
  background-color: #b3b3b3;
}
</style>
