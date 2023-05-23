<template>
  <div class="">
    <input class="form-control shadow rounded text-center fw-bold w-75 mx-auto fs-5" role="button" type="text" placeholder="> enter guess <"
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