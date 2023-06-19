<script>
import axios from 'axios';
import DoctorCard from '../../components/DoctorCard.vue';

export default {
  name: 'DoctorIndex',
  data() {
    return {
      users: [],
      specs: [],
      filteredSpec: '',
    }
  },

  components: {
    DoctorCard
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios.get('http://127.0.0.1:8000/api/users' + '?mainspec=' + this.filteredSpec).then(response => {
        this.users = response.data.results;
        this.specs = response.data.specs;

      });
    },

    getFilteredSpecs() {
      this.getUsers();
    }
  }
}
</script>

<template>
    homepage dottori

    <form action="">
      <select class="form-select" name="mainspec" id="mainspec" v-model="filteredSpec" @change="getFilteredSpecs">
        <option value="">Tutte</option>
        <option v-for="spec in specs" :value="spec.id">{{ spec.title }}</option>
      </select>
    </form>

    <div class="container d-flex justify-content-center flex-wrap gap-3 py-5">

      <div v-for="user in users">
        <DoctorCard :doctor="user"></DoctorCard>
      </div>
    </div>

</template>

<style>
</style>