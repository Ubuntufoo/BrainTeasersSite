
<template>
  <div class="">
    <button class="btn btn-secondary btn-lg shadow fs-4" @click="recordScore">Record Score</button>
  </div>
</template>

<script>
export default {
  name: "AnagramRecordScore",

  props: {
    finalScore: Number,
    user: String
  },

  methods: {
    async recordScore() {
      const data = {
        "user-name": this.user,
        "score": this.finalScore,
        "game": "ANAGRAM"
      };

      try {
        const response = await this.axios.post("/record-score/", data);
        console.log(response.data);
      } catch (error) {
        console.error(`Error recording score: ${error.message}`);
        if (error.response && error.response.status === 404) {
          console.error("Record not found");
        } else if (error.response && error.response.status === 500) {
          console.error("Server error");
        } else {
          console.error(`Unknown error: ${error.response.data}`);
        }
      }
    }
  }
}
</script>