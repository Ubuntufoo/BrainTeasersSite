<template>
  <router-view :user="parsedUser"/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      parsedUser: 'User not authenticated',
    }
  },
  created() {
    this.parsedUser = JSON.parse(document.getElementById('username').textContent);

  },
}
</script>

