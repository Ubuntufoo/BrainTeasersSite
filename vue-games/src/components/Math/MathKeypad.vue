<template>
  <div class="container my-5">
    <div class="row gap-1 my-1">
      <button v-for="button in buttons.slice(0, 3)"
      :key="button" @click="setInput(button)"
      :class="'col btn btn-success shadow fs-3 py-4'">{{ button }}
      </button>
    </div>
    <div class="row gap-1 my-1">
      <button v-for="button in buttons.slice(3, 6)"
      :key="button" @click="setInput(button)"
      :class="'col btn btn-success shadow fs-3 py-4'">{{ button }}
      </button>
    </div>
    <div class="row gap-1 my-1">
      <button v-for="button in buttons.slice(6, 9)"
      :key="button" @click="setInput(button)"
      :class="'col btn btn-success shadow fs-3 py-4'">{{ button }}
      </button>
    </div>
    <div class="row gap-1 my-1">
      <button v-for="button in buttons.slice(9)"
      :key="button" @click="setInput(button)"
      :class="'col-auto btn btn-success shadow fs-3 py-4 px-5'">{{ button }}
      </button>
      <button class="col btn btn-outline-success shadow fs-3 py-3" @click="input = ''">Clear</button>
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
  margin: 3px;
} */
</style>