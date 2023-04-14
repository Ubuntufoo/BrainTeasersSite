<template>
  <div>
    <button class="form-control btn btn-primary my-2" @click="$emit('play-button-click')">
      Play!
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnagramPlayButton',
}
</script>
