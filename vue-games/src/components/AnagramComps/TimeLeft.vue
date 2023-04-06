<template>
  <div>
    Time Left: {{ timeLeft }}
  </div>
</template>

<script>
export default {
  name: 'TimeLeft',
  props: {
    timeLeft: Number
  }
}
</script>