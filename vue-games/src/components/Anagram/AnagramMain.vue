<template>
  <section class="container py-5">
    <div class="shadow rounded bg-light w-75 mx-auto my-5 p-3">
      <div>
        <h2 class="display-3 fw-bold text-warning text-center pt-4">Anagram Hunt</h2>
        <hr class="border border-black border-3 opacity-100 rounded">
      </div>
      <div v-if="screen === 'config'" class="pt-2" id="config-container">
        <AnagramSelectInput :options="numbers" v-model="wordLength" />
        <ol class="list-group list-group-flush text-center my-5 fs-4">
          <li class="list-group-item"> Choose word length</li>
          <li class="list-group-item"> Press <span class="fw-bold">Play!</span></li>
          <li class="list-group-item"> Find anagrams! You get 60 seconds</li>
        </ol>
        <AnagramPlayButton @play-button-click="play" />
      </div>
      <div id="game-container" v-else-if="screen === 'play'">
        <div class="d-flex flex-xl-wrap justify-content-around border-bottom fw-bold py-4 fs-4">
          <AnagramScoreComp :score="score" />
          <AnagramTimeLeft :timeLeft="timeLeft" />
        </div>
        <div>
          <AnagramWordGiven :startWord="startWord" :answersLeft="answersLeft" />
          <AnagramAnswerInput v-model="answered" @change="answerChk(answered)" />
          <AnagramAnswerList :answers="correctAnswers" />
        </div>
      </div>
      <div class="h-50 d-flex flex-column justify-content-evenly align-items-center text-center py-5" id="end-game" v-else-if="screen === 'game-over'">
        <h1 class="text-info display-4 mt-3">Time is Up!</h1>
        <div class="text-info fs-1 my-4">
          <p>Final score:</p>
          <p><span class="fw-bold">{{ finalScore }}</span> Anagrams</p>
        </div>
        <AnagramRecordScore :finalScore="finalScore" :user="user" />
        <button v-on:click="config" class="btn btn-primary btn-lg shadow rounded-pill fs-3 my-5">Play Again</button>
      </div>
    </div>
  </section>
</template>

<script>
import AnagramSelectInput from './AnagramSelectInput';
import AnagramPlayButton from './AnagramPlayButton';
import AnagramScoreComp from './AnagramScoreComp';
import AnagramTimeLeft from './AnagramTimeLeft';
import AnagramWordGiven from './AnagramWordGiven';
import AnagramAnswerInput from './AnagramAnswerInput';
import AnagramRecordScore from './AnagramRecordScore.vue';
import AnagramAnswerList from './AnagramAnswerList.vue';
import { anagramsDict } from '../../helpers/anagramsDict.js';
import { getRandom } from '../../helpers/helpers.js';

export default {

  name: 'AnagramMainComponent',
  components: {
    AnagramSelectInput,
    AnagramPlayButton,
    AnagramScoreComp,
    AnagramTimeLeft,
    AnagramWordGiven,
    AnagramAnswerInput,
    AnagramRecordScore,
    AnagramAnswerList
  },

  props: {
    user: String,
  },

  data: function () {
    return {
      wordLength: '5',
      startArray: '',
      startWord: '',
      randArrayIndex: '',
      randWordIndex: '',
      answered: '',
      answerKey: '',
      correctAnswers: [],
      answersLeft: 0,
      score: 0,
      finalScore: 0,
      startTime: '',
      timeLeft: 60,
      screen: 'config',
      newAnagram: {},
      anagrams: anagramsDict
    }
  },
  computed: {
    numbers() {
      return Array.from({ length: 4 }, (_, i) => i + 5).map(n => [n, n]);
    },
  },
  methods: {
    config() {
      this.screen = "config";
    },
    gameOver() {
      this.finalScore = this.score;
      this.score = 0;
      this.timeLeft = 60;
      this.correctAnswers = [];
    },
    play() {
      this.screen = "play";

      if (this.score === 0) {
        this.newAnagram = this.anagrams;
      }
      console.log("wordLength value and type:", this.wordLength, typeof(this.wordLength))

      const userLength = Number(this.wordLength);

      console.log("🚀 ~ file: AnagramMain.vue:114 ~ play ~ Number(this.wordLength) = userLength:", userLength, ", type of userLength: ", typeof (userLength));
      // const keyLength = this.newAnagram[key].length;   error undefined in safari browser

      if (userLength === 0) {
        this.screen = "game-over";
        this.gameOver();
      } else {
        this.randArrayIndex = getRandom(userLength);
        const currentArray = this.newAnagram[userLength][this.randArrayIndex];
        const currentArrayLength = currentArray.length;

        this.randWordIndex = getRandom(currentArrayLength);
        this.startArray = currentArray;
        this.startWord = currentArray[this.randWordIndex];
        this.startArray.splice(this.randWordIndex, 1);
        this.answerKey = this.startArray;
        this.answersLeft = this.answerKey.length;

        console.log(`answer key: ${this.answerKey}`);
      }

      this.startTimer();
    },
    startTimer() {
      if (this.timeLeft === 60) {
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            this.screen = "game-over";
            this.gameOver();
          }
        }, 1000)
      }
    },
    answerChk(answer) {
      const indexOfAnswer = this.answerKey.indexOf(answer.toLowerCase());

      if (indexOfAnswer !== -1) {
        this.score++;
        this.answered = '';
        this.answersLeft--;
        this.answerKey.splice(indexOfAnswer, 1);
        this.renderAnswer(answer);

        console.log(`updated answer key: ${this.answerKey}`);

        if (this.answerKey.length === 0) {
          this.correctAnswers = [];
          this.newAnagram[this.WordLength].splice(this.randArrayIndex, 1);
          this.play();
        }
      } else {
        this.answered = '';
      }
    },
    renderAnswer(answer) {
      this.correctAnswers.push(answer);
    }
  }
}
</script>
