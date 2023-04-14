<template>
  <div>
    Time Left: {{ timeLeft }}
  </div>
</template>

<script>
export default {
  name: 'AnagramTimeLeft',
  props: {
    timeLeft: Number
  }
}
</script>