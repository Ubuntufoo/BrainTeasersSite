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
  <div class="rounded text-uppercase shadow fs-1 d-flex justify-content-center align-items-center user-select-none"
    :class="{
      'bg-danger text-white'
        : color == 'gray',
      'border border-success bg-success text-white'
        : color == 'green',
      'border border warning bg-warning text-white'
        : color == 'yellow',
    }">
    <transition>
      <p v-if="letter" class="mt-3">{{ letter }}</p>
    </transition>
  </div>
</template>

<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

div {
  height: 90px;
  width: 90px;
}
</style>