<script>
import axios from "axios";
import DoctorCard from "../../components/DoctorCard.vue";

export default {
  name: "DoctorAdvancedReserach",
  data() {
    return {
      // all users
      users: [],

      // sponsored users - with sponsorship
      sponsoredPresent: "",
      sponsoredUsers: [],

      // non-sponsored users - without sponsorship
      nonSponsoredPresent: "",
      nonSponsoredUsers: [],

      // get all the existing spec in order to fill the form select
      specs: [],

      // filtered spec deriving from filter applied in previous page (in DoctorsIndex page is filteredSpec)
      spec: this.$route.params.spec,

      // spec chosen by the guest user to filter doctors (it overwrites the variable 'spec' above defined)
      specVModel: "",

      //filter by vote + asc/desc order from forms
      userVote: "",
      order: "",

      // loading page + doctor found variables
      isLoading: true,
      doctorsFound: false,
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
    formattedNow() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const formattedNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedNow;
    },
  },

  methods: {
    getFilteredDocs() {
      axios
        .get("http://127.0.0.1:8000/api/users" + "?mainspec=" + this.spec)
        .then((response) => {
          this.specs = response.data.specs;
          console.log(response.data.specs);

          if (response.data.success) {
            this.users = response.data.results;

            this.doctorsFound = true;
            this.isLoading = false;
            this.getSponsoredUsers();
            this.getNonSponsoredUsers();
          } else {
            this.doctorsFound = false;
            this.isLoading = false;
          }
        });
    },

    filteredByVotes() {
      axios
        .get(
          "http://127.0.0.1:8000/api/users" +
            "?mainspec=" +
            (this.specVModel == "" ? this.spec : this.specVModel) +
            "&vote=" +
            this.userVote
        )
        .then((response) => {
          if (response.data.success) {
            this.users = response.data.results;
            // console.log({ ...Object(this.users) });
            this.specs = response.data.specs;
            this.reviews = response.data.reviews;
            this.votes = response.data.votes;
            this.order = "";
            this.getSponsoredUsers();
            this.getNonSponsoredUsers();

            // console.log(this.users);

            this.doctorsFound = true;
          } else {
            this.doctorsFound = false;
            this.isLoading = false;
          }
        });
    },

    sortedUsers(array) {
      return array.sort((a, b) => {
        if (this.order === "asc") {
          return a.reviews.length - b.reviews.length;
        } else if (this.order === "desc") {
          return b.reviews.length - a.reviews.length;
        } else {
          return 0;
        }
      });
    },

    sortAll() {
      this.sponsoredUsers = this.sortedUsers(this.sponsoredUsers);
      this.otherArray = this.sortedUsers(this.nonSponsoredUsers);
    },

    getSponsoredUsers() {
      //sponsored users array
      let usersWithSponsorships = this.users.filter(
        (user) =>
          user.detail.sponsorships.length > 0 &&
          user.detail.sponsorships[0].pivot.end_date > this.formattedNow
      );
      usersWithSponsorships.sort((a, b) => {
        if (b.detail.sponsorships[0].id === a.detail.sponsorships[0].id) {
          return (
            new Date(b.detail.sponsorships[0].pivot.end_date) -
            new Date(a.detail.sponsorships[0].pivot.end_date)
          );
        } else {
          return b.detail.sponsorships[0].id - a.detail.sponsorships[0].id;
        }
      });

      if (usersWithSponsorships.length > 0) {
        this.sponsoredUsers = usersWithSponsorships;
        this.sponsoredPresent = true;
      } else {
        this.sponsoredPresent = false;
      }
    },

    getNonSponsoredUsers() {
      //non-sponsored users array
      let usersWithoutSponsorships = [];
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.users[i].detail.sponsorships.length === 0 ||
          this.users[i].detail.sponsorships[0].pivot.end_date <
            this.formattedNow
        ) {
          usersWithoutSponsorships.push(this.users[i]);
        }
      }

      if (usersWithoutSponsorships.length > 0) {
        this.nonSponsoredUsers = usersWithoutSponsorships;
        this.nonSponsoredPresent = true;
      } else {
        this.nonSponsoredPresent = false;
      }
    },

    getFilteredDocsInPage() {
      axios
        .get("http://127.0.0.1:8000/api/users" + "?mainspec=" + this.specVModel)
        .then((response) => {
          if (response.data.success) {
            this.users = response.data.results;
            this.specs = response.data.specs;
            this.reviews = response.data.reviews;
            this.votes = response.data.votes;

            // console.log(this.users);

            this.doctorsFound = true;
            this.isLoading = false;
            this.getSponsoredUsers();
            this.getNonSponsoredUsers();

            this.userVote = "";
          } else {
            this.doctorsFound = false;
            this.isLoading = false;
          }
          this.$router.push({
            name: "doctorsSearch",
            params: { spec: this.specVModel },
            replace: true,
          });
        });
    },
  },
};
</script>

<template>
  <!-- spinner - is loading page -->
  <div v-if="isLoading" class="text-center py-5">
    <div id="spinner-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  <!-- when loading is finished -->
  <div v-else>
    <h2>Ricerca avanzata</h2>
    <!-- link to homepage with all doctors -->
    <div class="my-4">
      <router-link :to="{ name: 'home' }"
        >Torna alla homepage con tutti i dottori
      </router-link>
    </div>
    <!-- change the specialization selection -->
    <form action="">
      <label for="mainspec">Cambia la specializzazione</label>
      <select
        class="form-select"
        name="mainspec"
        id="mainspec"
        v-model="specVModel"
        @change="getFilteredDocsInPage"
      >
        <option value="">Tutte</option>
        <option v-for="spec in specs" :value="spec.title">
          {{ spec.title }}
        </option>
      </select>
    </form>

    <!-- votes filter -->
    <div v-if="users.length >= 1">
      <form action="">
        <label for="vote">Filtra per voto medio</label>
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
    </div>

    <!-- doctors are found -->
    <div v-if="doctorsFound">
      <!-- reviews order -->
      <form action="">
        <label for="numberOfReviews">Ordina per numero di recensioni</label>
        <select
          class="form-select"
          name="numberOfReviews"
          id="numberOfReviews"
          v-model="order"
          @change="sortAll"
        >
          <option value="" disabled selected>Scegli un ordine</option>
          <option value="asc">Cresecente</option>
          <option value="desc">Decrescente</option>
        </select>
      </form>

      <!-- doctors cards visualisation -->
      <div class="container">
        <!-- sponsored doctors -->
        <h4 class="text-center mt-5">Medici in evidenza</h4>

        <div
          v-if="sponsoredPresent"
          class="d-flex flex-row justify-content-center flex-wrap gap-3 py-5"
        >
          <div v-for="user in sponsoredUsers">
            <DoctorCard :doctor="user"></DoctorCard>
          </div>
        </div>
        <div v-else>
          <span>Non ci sono medici in evidenza</span>
        </div>

        <!-- non-sponsored doctors -->
        <h4 class="text-center mt-5">tutti gli altri medici</h4>

        <div
          v-if="nonSponsoredPresent"
          class="d-flex flex-row justify-content-center flex-wrap gap-3 py-5"
        >
          <div v-for="user in nonSponsoredUsers">
            <DoctorCard :doctor="user"></DoctorCard>
          </div>
        </div>
        <div v-else>
          <span>Non ci sono altri medici</span>
        </div>
      </div>
    </div>

    <!-- there are no doctors in the selected spec -->
    <div v-else>
      <div role="alert" class="alert alert-warning text-center">
        <span>Nessun dottore trovato</span>
      </div>
    </div>
  </div>
</template>

<style></style>
