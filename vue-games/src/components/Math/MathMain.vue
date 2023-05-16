<template>
  <section class="container w-25 shadow rounded mt-5 pb-4" id="main-container">
    <h2 class="display-3 fw-bold text-warning text-center pt-4">Mathificent</h2>
    <hr class="border border-black border-3 opacity-100 rounded">
    <div v-if="screen === 'config'" id="config-container">

      <MathSelectInput :currentValue="operation" label="Operation"
        id="operation" v-model="operation" :options="operations" />
      <MathSelectInput :currentValue="maxNumber" label="Maximum Number"
        id="max-number" v-model="maxNumber" :options="numbers" />
      <MathPlayButton @play-button-click="play" />
    </div>
    <div v-else-if="screen === 'play'" id="game-container" class="pb-5">
      <div v-if="timeLeft > 0" class="h-50 text-center">
        <div class="w-100 d-flex justify-content-evenly border-bottom my-4">
          <MathScore :score="score" />
          <MathTimer :timeLeft="timeLeft" />
        </div>
        <div :class="equationClass" class="w-75 d-inline-flex justify-content-evenly fs-1 mb-3 text-center">
          <MathEquation :question="question"
            :answer="input"
            :answered="answered" />
        </div>
        <MathKeypad :buttons="buttons" @keyPress="setInput"/>
      </div>
      <div v-else-if="timeLeft === 0">
        <div class="text-center mt-5">
          <h1 class="text-info display-4">Time is Up!</h1>
          <div class="w-100 d-flex justify-content-evenly text-info fs-1 my-5">
            <p>Final score:</p>
            <p class="fw-bold">{{ finalScore }}</p>
          </div>
          <div>
            <MathRecordScore :user="user" :finalScore="finalScore"/>
          </div>
          <div class="my-4">
            <button class="btn btn-primary btn-lg shadow rounded-pill fs-3"
              v-on:click="restart">
                Play Again!
            </button>
          </div>
          <div>
            <button class="btn btn-primary btn-lg shadow rounded-pill fs-3"
              v-on:click="config">
                Change Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MathSelectInput from './MathSelectInput';
import MathPlayButton from './MathPlayButton';
import MathScore from './MathScore';
import MathTimer from './MathTimer';
import MathEquation from './MathEquation';
import MathRecordScore from './MathRecordScore.vue';
import MathKeypad from './MathKeypad.vue';

import {randInt} from '../../helpers/helpers';
export default {
  name: 'MathMainComponent',
  components: {
    MathSelectInput,
    MathPlayButton,
    MathScore,
    MathTimer,
    MathEquation,
    MathRecordScore,
    MathKeypad,
  },
   props: {
     user: String,
  },
  data: function() {
    return {
      operations: [
        ['Addition', '+'],
        ['Subtraction', '-'],
        ['Multiplication', 'x'],
        ['Division', '/']
      ],
      operation: '+',
      maxNumber: '10',
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      screen: 'config',
      input: '',
      operands: {num1: '1', num2: '1'},
      answered: false,
      score: 0,
      finalScore: 0,
      gameLength: 60,
      timeLeft: 0
    }
  },
  methods: {
    config() {
      this.screen = "config";
    },
    play() {
      this.screen = "play";
      this.newQuestion();
      this.startTimer();
    },
    setInput(value) {
      if (value == 'clear') {
        this.input = "";
      } else {
        this.input += String(Number(value));
        this.answered = this.checkAnswer(this.input, this.operation, this.operands);
        if (this.answered) {
          setTimeout(this.newQuestion, 300);
          this.score++;
          this.finalScore++;
        }
      }
    },
    getRandNumbers(operator, low, high) {
      let num1 = randInt(low, high);
      let num2 = randInt(low, high);

      if (operator === '-') {
        [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
      }

      if(operator === '/') {
        if (num2 === 0) {
          num2 = randInt(1, high);
        }
        num1 = (num1 * num2);
      }
      return {num1, num2};
    },
    checkAnswer(userAnswer, operation, operands) {
      if (isNaN(userAnswer)) {
        return false;
      }
      const { num1, num2 } = operands;
      let correctAnswer;
      switch (operation) {
        case '+':
          correctAnswer = num1 + num2;
          break;
        case '-':
          correctAnswer = num1 - num2;
          break;
        case 'x':
          correctAnswer = num1 * num2;
          break;
      }
      return (Number(userAnswer) === correctAnswer);
    },
    newQuestion() {
      this.input='';
      this.answered = false;
      this.operands = this.getRandNumbers(
        this.operation, 0, this.maxNumber
      );
    },
    startTimer() {
      window.addEventListener('keydown', this.handleKeyDown);
      this.timeLeft = this.gameLength;
      if (this.timeLeft > 0) {
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            window.removeEventListener('keydown', this.handleKeyDown);
          }
        }, 1000)
      }
    },
    restart() {
      this.score = 0;
      this.finalScore = 0;
      this.startTimer();
      this.newQuestion();
    },
    handleKeyDown(e) {
      console.log(e);
      e.preventDefault();
      if (e.keyCode === 32 || e.keyCode === 13) {
        return;
      } else if (e.keyCode === 8) { // backspace
        this.input = this.input.substring(0, this.input.length - 1);
      } else if (!isNaN(e.key)) {
        this.setInput(e.key);
      }
    }
  },
  computed: {
    numbers: function() {
      const numbers = [];
      for (let number = 2; number <= 100; number++) {
        numbers.push([number, number]);
      }
      return numbers;
    },
    question() {
      return `${this.operands.num1} ${this.operation} ${this.operands.num2}`;
    },
    equationClass() {
      return this.answered ? 'text-primary fade' : 'text-info show';
    }
  }
}
</script>