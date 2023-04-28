<template>
  <div class="d-flex justify-content-evenly h4">
    <p class="text-uppercase">Time Left:</p>
    <p>{{ timeLeft }}</p>
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