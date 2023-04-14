<template>
  <strong>Score: {{score}}</strong>
</template>

<script>
  export default {
    name: 'MathScore',
    props: {
      score: Number
    }
  }
</script>