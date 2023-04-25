<script setup>
import { defineProps } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  letter: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <div
    class="rounded text-uppercase shadow fs-1 d-flex justify-content-center align-items-center"
    :class="{
    'bg-secondary text-white'
    : color == 'gray',
    'border border-success bg-success text-white'
    : color == 'green',
    'border border warning bg-warning text-white'
    : color == 'yellow',
    }"
  >
    {{ letter }}
  </div>
</template>

<style lang="css" scoped>
div {
  height: 90px;
  width: 90px;
}
</style>

