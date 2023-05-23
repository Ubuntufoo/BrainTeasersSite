<template>
  <div class="text-center">
    <button class="btn btn-primary btn-lg shadow rounded-pill w-50 fs-4 mb-4" @click="$emit('play-button-click')">
      Play!
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnagramPlayButton',
}
</script>
