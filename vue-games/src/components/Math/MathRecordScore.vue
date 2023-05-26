
<template>
  <button class="btn btn-secondary btn-lg rounded-pill shadow fs-3" @click="recordScore">Record Score</button>
</template>

<script>
export default {
  name: 'MathRecordScore',

  props: {
    finalScore: Number,
    user: String
  },

  methods: {
    async recordScore() {
      const data = {
        "user-name": this.user, // include user in the data object
        "score": this.finalScore,
        "game": "MATH"
      };

      try {
        const response = (await this.axios.post("/record-score/", data)).data;
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data);     // NOTE - use "error.response.data` for better results (not "error")
      }
    }
  }
}
</script>