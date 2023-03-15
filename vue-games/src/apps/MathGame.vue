<template>
  <div class="container p-5">
    <h1 class="text-center">Math Facts Practice</h1>
    <section id="operationWindow" class="d-flex flex-column align-items-center p-2">
      <label for="operationElem" class="form-label">Operation:</label>
      <select name="operationElem" id="operationElem" class="form-control-lg">
        <option value="addition">Addition</option>
        <option value="subtraction">Subtraction</option>
        <option value="multiplication">Multiplication</option>
        <option value="division">Division</option>
      </select>
      <div>
        <input type="submit" name="goBtn" id="goBtn" value="Go" class="btn btn-success m-3">
      </div>
      <div class="form-text">
        <ol>
          <li>Select operation.</li>
          <li>Press <span>Go.</span></li>
          <li>How many problems can you solve in 30 seconds?</li>
        </ol>
      </div>
    </section>
    <section id="gameWindow" class="d-flex flex-column align-items-center p-2">
      <h3 id="chosenOperation"></h3>
      <div id="numberInput" class="text-center p-3">
        <p id="currentExpressionElem"></p>
        <input type="text" name="valueInput" id="valueInput" size="4" class="form-control-lg">
      </div>
      <div id="numberGrid" class="container-fluid w-25">
        <div class="row">
          <button type="button" class="numBtn col-4 btn btn-success" data-num="1">1</button>
          <button type="button" class="numBtn col-4 btn btn-success" data-num="2">2</button>
          <button type="button" class="numBtn col-4 btn btn-success" data-num="3">3</button>
        </div>
        <div class="row">
          <button type="button" class="numBtn col-4 btn btn-success" data-num="4">4</button>
          <button type="button" class="numBtn col-4 btn btn-success" data-num="5">5</button>
          <button type="button" class="numBtn col-4 btn btn-success" data-num="6">6</button>
        </div>
        <div class="row">
          <button type="button" class="numBtn col-4 btn btn-success" data-num="7">7</button>
          <button type="button" class="numBtn col-4 btn btn-success" data-num="8">8</button>
          <button type="button" class="numBtn col-4 btn btn-success" data-num="9">9</button>
        </div>
        <div class="row">
          <button type="button" class="numBtn col-4 btn btn-success" data-num="0">0</button>
          <button type="button" id="span2btn" class="col-8 btn btn-success">CLEAR</button>
        </div>
      </div>
      <p>Current score: <span id="currentScoreElem"></span>
      </p>
      <p> Time left: <span id="timeLeftElem"></span>
      </p>
    </section>
    <section id="finalScoreWindow">
      <h3 id="chosenOperation2"></h3>
      <h4 class="text-center">Game over!</h4>
      <p id="finalUserScore"></p>
      <div class="text-center">
        <input type="submit" name="playAgain" id="playAgain" value="Play Again" class="btn btn-success">
      </div>
      <div>
        <div>
          <label for="user-name">Username</label>
          <input type="user-name" id="user-name" v-model="userName" />
        </div>
        <div>
          <label for="score">Score</label>
          <input name="score" type="number" id="score" v-model="score" />
        </div>
        <button @click="recordScore">Record Score</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MathGame',
  data() {
    return {
      userName: '',
      score: 0
    }
  },
  methods: {
    async recordScore() {
      const data = {
        "user-name": this.userName,
        "score": this.score,
        "game": "MATH"
      };

      const response = (await this.axios.post("/record-score/", data)).data;

      console.log(response);
    }
  }
}
</script>