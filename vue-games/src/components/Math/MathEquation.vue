<template>
  <div id="equation" class="row">
    <div class="col-5">{{question}}</div>
    <div class="col-2">=</div>
    <div class="col-5">{{answer}}</div>
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