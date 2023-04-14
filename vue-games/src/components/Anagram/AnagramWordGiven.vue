<template>
  <div class="text-center p-3">
    <p class="fs-3 pt-3"><span class="mark fw-bold">{{ startWord }}</span> <span class="fst-italic">( {{ answersLeft }} left)</span></p>
  </div>
</template>

<script>

export default {
  name: 'AnagramWordGiven',
  props: {
    startWord: String,
    answersLeft: Number
  },
  data: function () {
    return {
    }
  }

}
</script>