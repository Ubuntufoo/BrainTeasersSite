<template>
  <div class="d-flex justify-content-around">
    <label class="form-label fw-bold text-uppercase text-center h4 pt-3" for="word-length">Word Length :</label>
    <select class="form-select shadow fs-4 text-center w-50" role="button" id="word-length" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
      <option class="fw-bold" v-for="option in options" :key="option[1]" :value="option[1]">
        {{ option[0] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AnagramSelectInput',
  props: {
    options: Array,
    modelValue: String
  }
}
</script>
