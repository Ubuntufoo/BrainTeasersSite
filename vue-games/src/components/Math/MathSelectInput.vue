<template>
  <div class="row w-75 justify-content-center my-5 mx-auto">
    <label :for="id" class="col form-label fw-bold text-uppercase text-center fs-5 pt-3">{{label}}:</label>
    <select class="col-md form-select shadow fs-5 text-center" :id="id" :value="currentValue"
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