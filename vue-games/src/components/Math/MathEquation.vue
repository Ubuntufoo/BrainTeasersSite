<template>
  <div>{{question}}</div>
  <div class="mx-3">=</div>
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
