<template>
  <section class="container w-25 border border-primary border-5 rounded-5 my-5 p-5">
    <h1 class="text-center pb-2">Anagram Hunt</h1>
    <div v-if="screen === 'config'" id="config-container">

      <AnagramSelectInput :options="numbers" v-model="WordLength" />
      <ol class="fs-5">
        <li>Choose Word Length</li>
        <li>Press <span class="fw-bold">Play!</span></li>
        <li>Find anagrams! You get 60 seconds</li>
      </ol>
      <AnagramPlayButton @play-button-click="play" />
    </div>
    <div id="game-container" v-else-if="screen === 'play'">
      <div class="border-bottom row p-2 pt-4">
        <div class="col text-start fw-bold">
          <AnagramScoreComp :score="score" />
        </div>
        <div class="col text-end fw-bold">
          <AnagramTimeLeft :timeLeft="timeLeft" />
        </div>
      </div>
      <div>
        <AnagramWordGiven :startWord="startWord" :answersLeft="answersLeft" />
        <AnagramAnswerInput v-model="answered" @change="answerChk(answered)" />
        <ol id="answer-list" class="pt-5 text-success fw-bold fs-2">
          <li v-for="item in correctAnswers" :key="item.id">
            {{ item }}
          </li>
        </ol>
      </div>
    </div>
    <div class="text-center" id="end-game" v-else-if="screen === 'game-over'">
      <h2>Time's Up!</h2>
      <h3 class="my-4">You Got:</h3>
      <p class="fs-1 fw-bold text-success">{{ finalScore }}</p>
      <p class="fs-2 fw-bold text-primary">Anagrams</p>
      <AnagramRecordScore :finalScore="finalScore" :user="user" />
      <div>
        <a href="http://127.0.0.1:8000/anagram-game/" class="btn btn-dark form-control mt-3" role="button">Play Again</a>
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
  },

  props: {
    user: String,
  },

  data: function () {
    return {
      WordLength: '',
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
      timeLeft: 600,
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
    },
    play() {
      this.screen = "play";

      if (this.score === 0) {
        this.newAnagram = this.anagrams;
      }

      const key = this.WordLength;

      if (this.newAnagram[key].length == 0) {
        this.screen = "game-over";
        this.gameOver();
      } else {
        this.randArrayIndex = getRandom(this.newAnagram[key].length);
        this.randWordIndex = getRandom(this.newAnagram[key][this.randArrayIndex].length);
        this.startArray = this.newAnagram[key][this.randArrayIndex];
        this.startWord = this.newAnagram[key][this.randArrayIndex][this.randWordIndex];
        this.startArray.splice(this.randWordIndex, 1);
        this.answerKey = this.startArray;
        this.answersLeft = this.answerKey.length;

        console.log(`answer key: ${this.answerKey}`);
      }

      this.startTimer();
    },
    startTimer() {
      if (this.timeLeft == 60) {
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
      const indexOfAnswer = this.answerKey.indexOf(answer);
      console.log(`user answer is: ${answer}, and index of answer: ${indexOfAnswer}`);

      for (const i of this.answerKey) {
        if (i === answer) {
          this.score++;
          this.answered = '';
          this.answersLeft--;
          this.answerKey.splice(indexOfAnswer, 1);  // Improper testing of this.answerKey.splice(i, 1) , now corrected.
          this.renderAnswer(i);

          console.log(`updated answer key: ${this.answerKey}`);

          if (this.answerKey.length == 0) {
            this.correctAnswers = [];
            this.newAnagram[this.WordLength].splice([this.randArrayIndex], 1);
            this.play();
          }
        } else {
          this.answered = '';
        }
      }
    },
    renderAnswer(answer) {
      this.correctAnswers.push(answer);
    }
  }
}
</script>
