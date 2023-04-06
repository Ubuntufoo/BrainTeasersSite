<template>
  <strong>Time Left: {{timeLeft}}</strong>
</template>

<script>
  export default {
    name: 'MathTimer',
    props: {
      timeLeft: Number
    }
  }
</script>