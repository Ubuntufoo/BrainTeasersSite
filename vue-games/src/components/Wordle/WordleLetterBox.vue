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
  <div id="down-size"
    class="col rounded shadow justify-content-center align-items-center user-select-none text-uppercase text-center fs-1"
    :class="{
      'border border-danger bg-danger text-white'
        : color == 'gray',
      'border border-success bg-success text-white'
        : color == 'green',
      'border border warning bg-warning text-white'
        : color == 'yellow',
      'bg-light': !['gray', 'green', 'yellow'].includes(color),
    }">
    <transition>
      <p v-if="letter" class="pt-2">{{ letter }}</p>
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

@media (max-width: 576px) {
  #down-size {
    height: 50px;
    width: 50px;
  }
}

div {
  height: 80px;
  width: 80px;
}
</style>