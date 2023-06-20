<script>
import axios from "axios";
import DoctorCard from "../../components/DoctorCard.vue";

export default {
  name: "DoctorIndex",
  data() {
    return {
      users: [],
      specs: [],
      reviews: [],
      votes: [],
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

            this.users = response.data.results;
            this.specs = response.data.specs;
            this.reviews = response.data.reviews;
            this.votes = response.data.votes;

            // console.log(this.users);

            this.doctorsFound = true;
          } else {
            this.doctorsFound = false;
          }
        });
    },

    getFilteredSpecs() {
      this.getUsers();
      // this.$router.push('/doctors-search')
      this.$router.push({ name: 'doctorsSearch', params: { filteredData: this.filteredSpec } });

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
