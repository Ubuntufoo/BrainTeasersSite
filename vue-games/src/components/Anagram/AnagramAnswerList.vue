<template>
  <div class="mx-auto vstack mt-4">
  <transition-group name="list" tag="ul" class="me-4">
    <li v-for="item in answers" :key="item" :class="'fs-1 fw-bold text-white rounded-pill bg-success text-center w-75 my-1 mx-auto'">
      {{ item }}
    </li>
  </transition-group>
  </div>
</template>

<script>
export default {
  name: 'AnagramAnswerList',
  props: {
    answers: Array,
  }
}
</script>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

li {
  max-width: 200px;
}
</style>
