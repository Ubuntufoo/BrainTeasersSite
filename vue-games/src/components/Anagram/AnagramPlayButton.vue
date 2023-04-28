<template>
  <div class="text-center">
    <button class="btn btn-primary btn-lg shadow rounded-pill w-25 fs-4 mb-5" @click="$emit('play-button-click')">
      Play!
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnagramPlayButton',
}
</script>
