<template>
  <div class="text-center px-5 mx-5">
    <input class="form-control shadow rounded text-center fw-bold fs-5" role="button" type="text" placeholder="> enter guess here <"
      @change="$emit('update:modelValue', $event.target.value)" :value="value">
  </div>
</template>

<script>
export default {
  name: 'AnagramAnswerInput',
  props: {
    value: String
  },
  data: function () {
    return {

    }
  }
}
</script>