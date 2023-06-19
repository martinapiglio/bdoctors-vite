<script>
import axios from "axios";
import DoctorCard from "../../components/DoctorCard.vue";

export default {
  name: "DoctorIndex",
  data() {
    return {
      users: [],
      specs: [],
      filteredSpec: "",
      doctorsFound: false,
    };
  },

  components: {
    DoctorCard,
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios
        .get(
          "http://127.0.0.1:8000/api/users" + "?mainspec=" + this.filteredSpec
        )
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.specs);
            this.users = response.data.results;
            this.specs = response.data.specs;
            console.log(this.users);
            console.log(this.specs);
            this.doctorsFound = true;
          } else {
            this.doctorsFound = false;
          }
        });
    },

    getFilteredSpecs() {
      this.getUsers();
    },
  },
};
</script>

<template>
  homepage dottori

  <form action="">
    <select
      class="form-select"
      name="mainspec"
      id="mainspec"
      v-model="filteredSpec"
      @change="getFilteredSpecs"
    >
      <option value="">Tutte</option>
      <option v-for="spec in specs" :value="spec.title">
        {{ spec.title }}
      </option>
    </select>
  </form>

  <div
    v-if="doctorsFound"
    class="container d-flex justify-content-center flex-wrap gap-3 py-5"
  >
    <div v-for="user in users">
      <DoctorCard :doctor="user"></DoctorCard>
    </div>
  </div>
  <div v-else>
    <div role="alert" class="alert alert-warning text-center">
      Nessun dottore trovato
    </div>
  </div>
</template>

<style></style>
