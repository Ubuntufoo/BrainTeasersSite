<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, reactive, computed } from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import SimpleKeyboard from "./WordleKeyboard.vue"
import WordleRow from "./WordleRow.vue";
import WordleGameOver from "./WordleGameOver.vue";

const state = reactive({
  solution: "books",
  guesses: ["", "", "", "", "", ""], // all guesses are 5 characters long
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [], // added to future guesses at same position they were originally
    hint: [],
  }
});

const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] === state.solution,
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
  const currentGuess = state.guesses[state.currentGuessIndex];

  if (key == "{enter}") {
    if (currentGuess.length >= 5) {
      state.currentGuessIndex++;
      for (var i = 0; i < currentGuess.length; i++) {
        let c = currentGuess.charAt(i);
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
          state.guesses[state.currentGuessIndex - 1] =
            state.guesses[state.currentGuessIndex - 1].substring(0, i) +
            c +
            state.guesses[state.currentGuessIndex - 1].substring(i + 1);
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
    }
  } else if (key == "{bksp}") {
    //REMOVE LAST LETTER
    state.guesses[state.currentGuessIndex] =
      currentGuess.slice(0, -1);
  } else if (currentGuess.length < 5) {
    //ADD LETTER IF ALPHABETICAL
    const alphaRegex = /[a-zA-Z]/;
    if (alphaRegex.test(key)) {
      state.guesses[state.currentGuessIndex] += key;
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

  axios.get('https://api.datamuse.com/words?sp=?????')
    .then(response => {
      const randomWord = response.data[Math.floor(Math.random() * response.data.length)].word;
      state.solution = randomWord;
    })
    .catch(error => {
      console.error(error);
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
    <div class="text-center">
      <SimpleKeyboard
      @onKeyPress="handleInput"
      :guessedLetters="state.guessedLetters"
      />
    </div>
  </div>
  <div v-if="wonGame || lostGame" class="position-absolute top-50 start-50 translate-middle text-center">
    <WordleGameOver v-if="wonGame" :class="'text-primary'" :content="'Congratulations!'"/>
    <WordleGameOver v-if="lostGame" :class="'text-danger'" :content="'No more guesses. Play again!'"/>
    <button class="btn btn-outline-primary btn-lg fw-bold">Play Again</button>
  </div>
</template>

<style lang="css" scoped>
/* Style the button text */
.simple-keyboard {
  background-color: #d8d8d8;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px #d2d2d2;
  padding: 5px;
  margin-top: 10px;
  font-size: 1.6em;
  width: fit-content;
}

.simple-keyboard >>> .hg-row {
  display: flex;
  justify-content: center;
  padding: 0 10px 0 10px;
}

.simple-keyboard >>> .hg-button {
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
.simple-keyboard >>> .hg-button:hover {
  background-color: #e2e2e2;
}
.simple-keyboard >>> .hg-functionBtn {
  background-color: #c9c9c9;
}
.simple-keyboard >>> .hg-functionBtn:hover {
  background-color: #b3b3b3;
}
.simple-keyboard >>> .hg-button-enter {
  width: 5em;
}
.simple-keyboard >>> .hg-standardBtn {
  width: 1.8em;
}
.simple-keyboard >>> .hg-button-bksp {
  width: 5em;
}
.simple-keyboard >>> .hg-button:hover,
.simple-keyboard >>> .hg-button:active {
  background-color: #b3b3b3;
}

</style>
