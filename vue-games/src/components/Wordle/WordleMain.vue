<script setup>
import { onMounted, reactive, computed } from "vue";
import SimpleKeyboard from "./WordleKeyboard.vue"
import WordleRow from "./WordleRow.vue";

const state = reactive({
  solution: "books",
  guesses: ["", "", "", "", "", ""],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  }
});

const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] === state.solution,
);

const lostGame = computed(() => !wonGame.value
  && state.currentGuessIndex >= 6
);

const handleInput = (key) => {
  if (state.currentGuessIndex >= 6 || wonGame.value) {
    return;
  }
  const currentGuess = state.guesses[state.currentGuessIndex];

  if (key == "{enter}") {
    state.currentGuessIndex++;
    for (var i = 0; i < currentGuess.length; i++) {
      let c = currentGuess.charAt(i);
      if (c == state.solution.charAt(i)) {
        state.guessedLetters.found.push(c);
      } else if (state.solution.indexOf(c) != -1) {
        state.guessedLetters.hint.push(c);
      } else {
        state.guessedLetters.miss.push(c);
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
  <div class="d-flex flex-column align-items-center">
    <div>
      <WordleRow
      v-for="(guess, i) in state.guesses"
      :key="i"
      :value="guess"
      :solution="state.solution"
      :submitted="i < state.currentGuessIndex"
      />
    </div>
    <p v-if="wonGame" class="text-center">
      Congratulations!
    </p>
    <p v-else-if="lostGame" class="text-center">
      No more guesses left, better luck next time.
    </p>
    <SimpleKeyboard
    @onKeyPress="handleInput"
    :guessedLetters="state.guessedLetters"
    />
  </div>

</template>


<style lang="css" scoped>
/* Style the button text */
.simple-keyboard {
  display: inline-flex;
  flex-direction: column;
  background-color: #d8d8d8;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px #d2d2d2;
  font-size: 2em;
  width: fit-content;
  /* margin-top: 50px; */
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
