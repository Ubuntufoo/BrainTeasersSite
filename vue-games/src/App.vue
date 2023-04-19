<template>
  <router-view :user="parsedUser" :user2="parsedUser2"/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      parsedUser: null,
      parsedUser2: null
    }
  },
   created() {
     this.parsedUser = JSON.parse(document.getElementById('username').textContent),
     this.parsedUser2 = JSON.parse(document.getElementById('username').textContent)

  },
}
</script>

