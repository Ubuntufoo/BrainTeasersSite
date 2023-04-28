<template>
  <div class="d-flex justify-content-evenly h4">
    <p class="text-uppercase">Score:</p>
    <p>{{ score }}</p>
  </div>
</template>

<script>
export default {
  name: 'AnagramScoreComp',
  props: {
    score: Number
  }
}
</script>