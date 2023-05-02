<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, reactive, computed, defineProps} from "vue";
import axios from 'axios';
import SimpleKeyboard from "./WordleKeyboard.vue"
import WordleRow from "./WordleRow.vue";
import WordleGameOver from "./WordleGameOver.vue";

const props = defineProps({
  user: String
});
const state = reactive({
  solution: "",             // initialized from API call
  guesses: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [], // added to future guesses at same position they were originally
    hint: [],
  }
});
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
      console.log(">>Backspace loop<<. currentGuess array value at index", i, "=", currentGuess[i], ". Is", currentGuess[i], "included in state.guessedLetters.found? True or false:", Boolean(state.guessedLetters.found.includes(currentGuess[i])), "Also, does currentGuess[i] == state.solution[i]? True or false:", Boolean(currentGuess[i] == state.solution[i]));
      if (currentGuess[i] == "") {
        console.log("Option 1. Its an empty", typeof (currentGuess[i]), ". continue.")
        continue;
      } else if (state.guessedLetters.found.includes(currentGuess[i]) && currentGuess[i] == state.solution[i]) {
        console.log("Option 2: It matches solution @index. Number of occurs in last guess:", state.guesses[state.currentGuessIndex - 1].reduce((acc, curr) => acc + (curr === currentGuess[i]), 0), ". Number of occurs in solution:", state.solution.split("").reduce((acc, curr) => acc + (curr === currentGuess[i]), 0));
        if (state.guesses[state.currentGuessIndex - 1].reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2 && state.solution.split("").reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2) {
          console.log("Option 2.1: The previous guess and the solution have 2+ of the matching character. Ignore char and continue.");
          continue;
        } else if (state.guesses[state.currentGuessIndex - 1].reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) <= 1 && state.solution.split("").reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2) {
          if (currentGuess.reduce((acc, curr) => acc + (curr === currentGuess[i]), 0) >= 2) {
            console.log("Option 2.2.1: The solution has 2+ of the matching char, but the prev guess does not. Replacing char with '', as long as there is 1 still remaining in currentGuess.");
            currentGuess[i] = "";
            break;
          }
          console.log("Option 2.2.2: The solution has 2+ of the matching char, but the prev guess does not. Also, the currentGuess only has 1 instance of char remaining. Do nothing and continue.");
          continue;
        } else {
          console.log("Option 2.3: Continue.");
          continue;
        }
      } else {
        console.log("Option 3. Make this index = ''.")
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
  <div :class="computedClass" class="d-flex flex-column align-items-center gap-4 mt-5">
    <div class="container d-flex flex-column gap-1 align-items-center">
      <WordleRow
      v-for="(guess, i) in state.guesses"
      :key="i"
      :value="guess"
      :solution="state.solution"
      :submitted="i < state.currentGuessIndex"
      />
    </div>
    <div>
      <SimpleKeyboard
      @onKeyPress="handleInput"
      :guessedLetters="state.guessedLetters"
      />
    </div>
  </div>
  <div v-if="wonGame || lostGame" class="position-absolute top-50 start-50 translate-middle text-center">
    <WordleGameOver v-if="wonGame" :class="'text-primary'" :content="'Congratulations!'"/>
    <WordleGameOver v-if="lostGame" :class="'text-danger'" :content="'No more guesses. Play again!'"/>
    <button class="btn btn-dark btn-lg fw-bold">Play Again</button>
  </div>
</template>

<style lang="css" scoped>
.simple-keyboard {
  background-color: #d8d8d8;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px #d2d2d2;
  padding: 5px;
  font-size: 1.6em;
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
