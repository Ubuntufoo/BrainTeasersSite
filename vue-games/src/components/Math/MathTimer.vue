<template>
  <div class="d-flex fs-4">
    <p class="text-uppercase me-2">Time Left:</p>
    <p class="fw-bold">{{ timeLeft }}</p>
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