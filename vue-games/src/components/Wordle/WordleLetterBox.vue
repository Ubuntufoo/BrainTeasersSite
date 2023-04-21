<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  letter: {
    type: String,
    default: "",
  }
})
</script>

<template>
  <div class="border border-secondary rounded text-uppercase text-center py-3 px-4 bg-light shadow">
    a
  </div>
</template>
