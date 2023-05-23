<template>
  <div>
    <p class="text-uppercase">Time Left: {{ timeLeft }}</p>
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