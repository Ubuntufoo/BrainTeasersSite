<template>
  <div class="d-flex flex-column gap-4 align-items-center m-5">
      <span class="fs-1 fw-bold text-white rounded-pill bg-primary px-5">{{ startWord }}</span>
      <span class="fst-italic fs-5">( {{ answersLeft }}  remain )</span>
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