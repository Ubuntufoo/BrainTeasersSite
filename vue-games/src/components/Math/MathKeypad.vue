<template>
  <div class="container">
    <div class="row gap-1 my-1 mx-5">
      <button v-for="button in buttons.slice(0, 3)"
      :key="button" @click="$emit('keyPress', button)"
      :class="'col btn btn-outline-success shadow fs-3 py-4'">{{ button }}
      </button>
    </div>
    <div class="row gap-1 my-1 mx-5">
      <button v-for="button in buttons.slice(3, 6)"
      :key="button" @click="$emit('keyPress', button)"
      :class="'col btn btn-outline-success shadow fs-3 py-4'">{{ button }}
      </button>
    </div>
    <div class="row gap-1 my-1 mx-5">
      <button v-for="button in buttons.slice(6, 9)"
      :key="button" @click="$emit('keyPress', button)"
      :class="'col btn btn-outline-success shadow fs-3 py-4'">{{ button }}
      </button>
    </div>
    <div class="row gap-1 my-1 mx-5">
      <button v-for="button in buttons.slice(9)"
      :key="button" @click="$emit('keyPress', button)"
      :class="'col btn btn-outline-success shadow fs-3 py-4'">{{ button }}
      </button>
      <button class="col-8 btn btn-success shadow fs-3 py-4" @click="$emit('keyPress', 'clear')">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MathKeypad',
  props: {
    buttons: Array
  }
}
</script>

<style scoped>
/* button {
  height: 100px;
  width: 100px;
} */
</style>