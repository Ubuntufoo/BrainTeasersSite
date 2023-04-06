<template>
  <div>
    Score: {{ score }}
  </div>
</template>

<script>
export default {
  name: 'ScoreComp',
  props: {
    score: Number
  }
}
</script>