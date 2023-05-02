<template>
  <div class="d-flex justify-content-between text-center my-5">
    <label :for="id" class="form-label fw-bold text-uppercase text-center h4 pt-3">{{label}}:</label>
    <select class="form-select shadow fs-4 text-center w-50" :id="id" :value="currentValue"
        @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in options" :key="option[1]"
        :value="option[1]" :class="'fw-bold'">
        {{option[0]}}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'MathSelectInput',
    props: {
      id: String,
      label: String,
      options: Array,
      currentValue: String
    }
  }
</script>