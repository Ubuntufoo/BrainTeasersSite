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
    class="border border-secondary rounded text-uppercase text-center py-3 px-4 shadow"
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
