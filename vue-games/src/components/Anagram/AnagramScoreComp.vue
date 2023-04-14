<template>
  <div>
    Score: {{ score }}
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