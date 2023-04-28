<template>
  <ul id="answer-list" class="vstack gap-1 m-5 px-5 pb-5">
    <li v-for="item in answers" :key="item.id" :class="'fs-1 fw-bold text-white rounded-pill bg-success px-4 mx-5 text-center'">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AnagramAnswerList',
  props: {
    answers: String,
  }
}
</script>