<template>
  <div class="d-flex fs-4">
    <p class="text-uppercase me-2">Score:</p>
    <p class="fw-bold">{{ score }}</p>
  </div>
</template>

<script>
  export default {
    name: 'MathScore',
    props: {
      score: Number
    }
  }
</script>