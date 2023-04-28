<template>
  <div class="text-center">
    <button class="btn btn-primary btn-lg shadow rounded-pill w-25 fs-4 my-4" @click="$emit('play-button-click')">
      Play!
    </button>
  </div>
</template>

<script>
  export default {
    name: 'MathPlayButton'
  }
</script>