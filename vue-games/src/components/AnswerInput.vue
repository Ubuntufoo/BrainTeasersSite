<template>
  <div class="text-center px-5">
    <input class="form-control" type="text" placeholder="enter anagrams"
      @change="$emit('update:modelValue', $event.target.value)" :value="value">
  </div>
</template>

<script>
export default {
  name: 'AnswerInput',
  props: {
    value: String
  },
  data: function () {
    return {

    }
  }
}
</script>