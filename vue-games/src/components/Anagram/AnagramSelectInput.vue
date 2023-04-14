<template>
  <div class="row my-5">
    <div class="col-6">
      <label class="col fw-bold text-uppercase" id="word-length">Word Length</label>
    </div>
    <div class="col">
      <select class="col form-select" id="word-length" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
        <option v-for="option in options" :key="option[1]" :value="option[1]">
          {{ option[0] }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnagramSelectInput',
  props: {
    /* id: String,
    label: String, */
    options: Array,
    modelValue: String
  },
  data: function () {
    return {

    }
  }
}
</script>
