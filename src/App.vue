<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      users: [],
    }
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios.get('http://127.0.0.1:8000/api/users').then(response => {
        this.users = response.data.results;
        console.log(response.data.results);
      });
    }
  }
}


</script>

<template>
  app template
</template>

<style lang="scss">

</style>
