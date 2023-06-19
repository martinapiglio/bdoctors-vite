<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  data() {
    return {
      users: [],
    }
  },

  components: {
    AppHeader,
    AppFooter
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
  <AppHeader></AppHeader>
  <!-- <router-view></router-view> -->
  homepage

  <div v-for="user in users">
    {{ user.name }} {{ user.detail.phone_number }}
  </div>

  <AppFooter></AppFooter>
</template>

<style lang="scss">

</style>
