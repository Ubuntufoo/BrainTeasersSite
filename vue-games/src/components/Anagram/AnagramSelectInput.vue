<template>
  <div class="d-flex justify-content-evenly mt-3">
    <label class="form-label fw-bold text-uppercase fs-4 pt-3 text-center" for="word-length">Word Length:</label>
    <select class="form-select shadow fs-4 w-50 text-center" role="button" id="word-length" :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)">
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
