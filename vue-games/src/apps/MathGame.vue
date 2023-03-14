<template>
  <p>This is the Math Game Vue.</p>
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