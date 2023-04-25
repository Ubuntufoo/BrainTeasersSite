<!-- eslint-disable no-unused-vars -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  content: { type: String, required: true }
});
</script>

<template>
  <p class="text-uppercase fw-bold h1">{{ content }}</p>
</template>


