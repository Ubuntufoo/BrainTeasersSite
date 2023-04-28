<template>
  <div>
    <div>{{question}}={{ answer }}</div>
  </div>
</template>

<script>
  export default {
    name: 'MathEquation',
    props: {
      question: String,
      answer: String,
      answered: Boolean
    }
  }
</script>

<style scoped>
  #equation {
    font-size: 1.6em;
    margin: auto;
    width: 90%;
  }
</style>