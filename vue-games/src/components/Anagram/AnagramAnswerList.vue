<template>
  <div class="mx-auto vstack my-5">
  <transition-group name="list" tag="div">
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