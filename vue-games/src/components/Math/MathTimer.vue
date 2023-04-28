<template>
  <div class="w-75 d-flex justify-content-evenly h4">
    <p class="text-uppercase">Time Left:</p>
    <p>{{ timeLeft }}</p>
  </div>
</template>

<script>
  export default {
    name: 'MathTimer',
    props: {
      timeLeft: Number
    }
  }
</script>