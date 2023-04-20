<template>
  <router-view :user="parsedUser" :user2="parsedUser2" :testProp="testProp"/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      parsedUser: 'User not authenticated',
      parsedUser2: 'User not authenticated',
      testProp: 'User not authenticated'

    }
  },
  created() {
    const parsedData = JSON.parse(document.getElementById('username').textContent);
    this.parsedUser = parsedData;
    this.parsedUser2 = parsedData;
  },
}
</script>

