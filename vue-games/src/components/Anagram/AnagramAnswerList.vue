<template>
  <div class="vstack m-5 pb-5 px-2">
  <transition-group name="list" tag="div">
    <li v-for="item in answers" :key="item" :class="'fs-1 fw-bold text-white rounded-pill bg-success text-center mx-5 my-1'">
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