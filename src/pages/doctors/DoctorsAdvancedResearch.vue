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
      spec: this.$route.params.spec,
      doctorsFound: false,
      userVote: "",
      order: "",
    };
  },

  components: {
    DoctorCard,
  },

  created() {
    this.getFilteredDocs();
  },

  computed: {
    getCosoleLog() {
      return console.log(this.userVote);
    },
    getDescOrAsc() {
      return console.log(this.descOrAsc);
    },
  },

  methods: {
    getFilteredDocs() {
      axios
        .get("http://127.0.0.1:8000/api/users" + "?mainspec=" + this.spec)
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

    filteredByVotes() {
      axios
        .get(
          "http://127.0.0.1:8000/api/users" +
            "?mainspec=" +
            this.spec +
            "&vote=" +
            this.userVote
        )
        .then((response) => {
          if (response.data.success) {
            console.log(
              "http://127.0.0.1:8000/api/users" +
                "?mainspec=" +
                this.spec +
                "&vote=" +
                this.userVote
            );
            this.users = response.data.results;
            this.specs = response.data.specs;
            this.reviews = response.data.reviews;
            this.votes = response.data.votes;
            this.order = "";

            // console.log(this.users);

            this.doctorsFound = true;
          } else {
            this.doctorsFound = false;
          }
        });
    },
    sortedUsers() {
      return this.users.sort((a, b) => {
        if (this.order === "asc") {
          return a.reviews.length - b.reviews.length;
        } else if (this.order === "desc") {
          return b.reviews.length - a.reviews.length;
        } else {
          return 0;
        }
      });
    },
  },
};
</script>

<template>
  <form action="">
    <label for="vote">Ordina per voto medio</label>
    <select
      class="form-select"
      name="vote"
      id="vote"
      v-model="userVote"
      @change="filteredByVotes"
    >
      <option value="">Tutti</option>
      <option v-for="number in 5" :value="number">{{ number }}</option>
    </select>
  </form>

  <div v-if="doctorsFound">
    <form action="">
      <label for="numberOfReviews">Ordina per numero di recensioni</label>
      <select
        class="form-select"
        name="numberOfReviews"
        id="numberOfReviews"
        v-model="order"
        @change="sortedUsers"
      >
        <option value="" disabled selected>Scegli un ordine</option>
        <option value="asc">Cresecente</option>
        <option value="desc">Decrescente</option>
      </select>
    </form>
  </div>
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
