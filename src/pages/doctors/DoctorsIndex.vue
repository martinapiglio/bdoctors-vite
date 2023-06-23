<script>
import axios from "axios";
import DoctorCard from "../../components/DoctorCard.vue";
import { resolveTransitionHooks } from "vue";

export default {
  name: "DoctorIndex",
  data() {
    return {
      users: [],

      sponsoredPresent: "",
      sponsoredUsers: [],

      nonSponsoredPresent: "",
      nonSponsoredUsers: [],

      specs: [],
      reviews: [],
      votes: [],
      filteredSpec: "",
      doctorsFound: false,
      isLoading: true,
    };
  },

  components: {
    DoctorCard,
  },

  computed: {
    formattedNow() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
      const day = String(now.getDate()).padStart(2, "0"); // Add leading zero if needed

      const hours = String(now.getHours()).padStart(2, "0"); // Add leading zero if needed
      const minutes = String(now.getMinutes()).padStart(2, "0"); // Add leading zero if needed
      const seconds = String(now.getSeconds()).padStart(2, "0"); // Add leading zero if needed

      const formattedNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedNow;
    },
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios.get("http://127.0.0.1:8000/api/users").then((response) => {
        if (response.data.success) {
          this.users = response.data.results;
          this.specs = response.data.specs;
          this.reviews = response.data.reviews;
          this.votes = response.data.votes;

          this.doctorsFound = true;
          this.isLoading = false;

          //retrieve sponsorship pivot table end date from users for each user
          for (let i = 0; i < this.users.length; i++) {
            if (response.data.results[i].detail.sponsorships.length > 0) {
              console.log(
                "id: " +
                  response.data.results[i].id +
                  " - end_date: " +
                  response.data.results[i].detail.sponsorships[0].pivot.end_date
              );
            } else {
              console.log(
                "id: " +
                  response.data.results[i].id +
                  " - l'utente non ha sponsorizzazioni attive"
              );
            }
          }

          this.getSponsoredUsers();
          this.getNonSponsoredUsers();
        } else {
          this.doctorsFound = false;
        }
      });
    },

    getFilteredSpecs() {
      this.getUsers();
      this.$router.push({
        name: "doctorsSearch",
        params: { spec: this.filteredSpec },
      });
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

    getAllUsers() {
      //merged array -- should maintain the order because you concatenate the first array (alrady ordered by end_date) with second one
      let usersAll = this.sponsoredUsers.concat(this.nonSponsoredUsers);

      this.users = usersAll;
    },
  },
};
</script>

<template>
  homepage dottori

  <div v-if="isLoading" class="text-center py-5">
    <div id="spinner-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  <div v-else>
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

    <div v-if="doctorsFound" class="container">
      <h4 class="text-center mt-5">Medici in evidenza</h4>
      <div
        v-if="sponsoredPresent"
        class="d-flex justify-content-center flex-wrap gap-3 py-5"
      >
        <div v-for="user in sponsoredUsers">
          <DoctorCard :doctor="user"></DoctorCard>
        </div>
      </div>
      <div v-else>
        <span>Non ci sono medici in evidenza</span>
      </div>

      <h4 class="text-center mt-5">tutti gli altri medici</h4>
      <div
        v-if="nonSponsoredPresent"
        class="d-flex justify-content-center flex-wrap gap-3 py-5"
      >
        <div v-for="user in nonSponsoredUsers">
          <DoctorCard :doctor="user"></DoctorCard>
        </div>
      </div>
      <div v-else>
        <span>Non ci sono altri medici</span>
      </div>
    </div>
    <div v-else>
      <div role="alert" class="alert alert-warning text-center">
        Nessun dottore trovato
      </div>
    </div>
  </div>
</template>

<style></style>
