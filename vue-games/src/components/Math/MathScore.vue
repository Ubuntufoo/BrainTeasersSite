<template>
  <div class="w-75 d-flex justify-content-evenly h4">
    <p class="text-uppercase">Score:</p>
    <p>{{ score }}</p>
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