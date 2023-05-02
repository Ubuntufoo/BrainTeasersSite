<template>
  <div>{{question}}</div>
  <div>=</div>
  <div>{{ answer }}</div>
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
</style>