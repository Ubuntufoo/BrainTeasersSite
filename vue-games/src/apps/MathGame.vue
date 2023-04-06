<template>
  <Main />

  <div class="d-flex flex-column justify-content-center align-items-center m-5">
    <div>
      <label for="user-name" class="form-label">Username</label>
      <input type="text" class="form-control mb-3" id="user-name" v-model="userName" />
      <label for="score" class="form-label">Score</label>
      <input type="number" class="form-control mb-3" id="score" v-model="score" />
      <button class="btn btn-success" @click="recordScore">Record Score</button>
    </div>
  </div>
</template>

<script>

import Main from '../components/MathComps/Main';

export default {
  name: 'MathGame',
  components: {
    Main
  },
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