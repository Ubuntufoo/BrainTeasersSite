<template>
  <div class="row mx-1 my-3">
    <label :for="id" class="col font-weight-bold">{{label}}</label>
    <select class="col form-control" :id="id" :value="currentValue"
        @input="$emit('input', $event.target.value)">
      <option v-for="option in options" :key="option[1]"
        :value="option[1]">
        {{option[0]}}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'SelectInput',
    props: {
      id: String,
      label: String,
      options: Array,
      currentValue: String
    }
  }
</script>