
<template>
  <div class="d-flex flex-column justify-content-center align-items-center mb-5">
    <button class="btn btn-primary" @click="recordScore">Record Score</button>
  </div>
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
        console.log(response);
        console.log(response.data);
      } catch (error) {
        console.error(error);     // NOTE - use "error.response.data` for better results (not "error")
        console.error(error.response);     // NOTE - use "error.response.data` for better results (not "error")
        console.error(error.response.data);     // NOTE - use "error.response.data` for better results (not "error")
      }
    }
  }
}
</script>