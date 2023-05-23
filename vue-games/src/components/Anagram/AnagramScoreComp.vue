<template>
  <div>
    <p class="text-uppercase">Score: {{ score }}</p>
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