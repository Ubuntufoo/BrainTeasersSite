<template>
  <div class="row row-cols-3 justify-content-center gap-1 my-1">
    <button v-for="button in buttons.slice(0, 3)"
    :key="button" @click="$emit('keyPress', button)"
    :class="'col-2 btn btn-outline-success shadow fs-3'">{{ button }}
    </button>
  </div>
  <div class="row row-cols-3 justify-content-center gap-1 my-1">
    <button v-for="button in buttons.slice(3, 6)"
    :key="button" @click="$emit('keyPress', button)"
    :class="'col-2 btn btn-outline-success shadow fs-3'">{{ button }}
    </button>
  </div>
  <div class="row row-cols-3 justify-content-center gap-1 my-1">
    <button v-for="button in buttons.slice(6, 9)"
    :key="button" @click="$emit('keyPress', button)"
    :class="'col-2 btn btn-outline-success shadow fs-3'">{{ button }}
    </button>
  </div>
  <div class="row row-cols-2 justify-content-center gap-2 my-1">
    <button v-for="button in buttons.slice(9)"
    :key="button" @click="$emit('keyPress', button)"
    :class="'col-2 btn btn-outline-success shadow fs-3'">{{ button }}
    </button>
    <button class="col-4 btn btn-success shadow fs-3" @click="$emit('keyPress', 'clear')">Clear</button>
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