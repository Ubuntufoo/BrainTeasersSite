<template>
  <section class="container w-25 shadow rounded mt-5" id="main-container">
    <h1 class="display-3 fw-bold text-warning text-center pt-4">Mathificent</h1>
    <hr class="border border-black border-3 opacity-100 rounded">
    <div v-if="screen === 'config'" id="config-container">

      <MathSelectInput :currentValue="operation" label="Operation"
        id="operation" v-model="operation" :options="operations" />
      <MathSelectInput :currentValue="maxNumber" label="Maximum Number"
        id="max-number" v-model="maxNumber" :options="numbers" />
      <MathPlayButton @play-button-click="play" />
    </div>
    <div v-else-if="screen === 'play'" id="game-container">
      <div v-if="timeLeft > 0">
        <div class="d-flex flex-column justify-content-start align-items-center mx-5">
          <div class="w-100 d-flex justify-content-evenly border-bottom  pt-4">
            <MathScore :score="score" />
            <MathTimer :timeLeft="timeLeft" />
          </div>
          <div :class="equationClass" id="equation">
            <MathEquation :question="question"
              :answer="input"
              :answered="answered" />
          </div>
          <MathKeypad :buttons="buttons" />
        </div>
      </div>
      <div v-else-if="timeLeft === 0">
        <div>
          <h2>Time's Up!</h2>
          <strong class="big">You Answered</strong>
          <div class="huge">{{ score }}</div>
          <strong class="big">Questions Correctly</strong>
          <MathRecordScore :user="user" :finalScore="finalScore"/>
          <button class="btn btn-primary form-control m-1"
            v-on:click="restart">
              Play Again with Same Settings
          </button>
          <button class="btn btn-secondary form-control m-1"
            v-on:click="config">
              Change Settings
          </button>
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
      screen: 'play',           // revert this to config to fix
      input: '',
      operands: {num1: '1', num2: '1'},
      answered: false,
      score: 0,
      finalScore: 0,
      gameLength: 6,
      timeLeft: 1           // revert this to 0 to fix
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
      this.input += String(Number(value));
      this.answered = this.checkAnswer(this.input, this.operation, this.operands);
      if (this.answered) {
        setTimeout(this.newQuestion, 300);
        this.score++;
        this.finalScore++;
      }
    },
    getRandNumbers(operator, low, high) {
      let num1 = randInt(low, high);
      let num2 = randInt(low, high);

      if (operator === '-') { // Make sure higher num comes first
        [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
      }

      if(operator === '/') {
        if (num2 === 0) { // No division by zero
          num2 = randInt(1, high);
        }
        num1 = (num1 * num2);
      }
      return {num1, num2};
    },
    checkAnswer(userAnswer, operation, operands) {
      if (isNaN(userAnswer)) {
        return false; // User hasn't answered
      }
      let correctAnswer;
      switch(operation) {
        case '+':
          correctAnswer = operands.num1 + operands.num2;
          break;
        case '-':
          correctAnswer = operands.num1 - operands.num2;
          break;
        case 'x':
          correctAnswer = operands.num1 * operands.num2;
          break;
        default: // division
          correctAnswer = operands.num1 / operands.num2;
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
      window.addEventListener('keyup', this.handleKeyUp);
      this.timeLeft = this.gameLength;
      if (this.timeLeft > 0) {
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            window.removeEventListener('keyup', this.handleKeyUp);
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
    handleKeyUp(e) {
      e.preventDefault(); // prevent the normal behavior of the key
      if (e.keyCode === 32 || e.keyCode === 13) { // space/Enter
        this.clear();
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
      return this.answered ? 'row text-primary my-2 fade' : 'row text-secondary my-2';
    }
  }
}
</script>