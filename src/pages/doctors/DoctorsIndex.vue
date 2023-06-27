<script>
import axios from "axios";
import DoctorCard from "../../components/DoctorCard.vue";
import { resolveTransitionHooks } from "vue";

export default {
  name: "DoctorIndex",
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

      // spec chosen by the guest user to filter doctors
      filteredSpec: "",

      // loading page + doctor found variables
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
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const formattedNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedNow;
    },
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          this.specs = response.data.specs;
          if (response.data.success) {
            this.users = response.data.results;

            this.doctorsFound = true;
            this.isLoading = false;

            this.getSponsoredUsers();
            this.getNonSponsoredUsers();

            //retrieve sponsorship pivot table end date from users for each user
            // for (let i = 0; i < this.users.length; i++) {
            //   if (response.data.results[i].detail.sponsorships.length > 0) {
            //     console.log(
            //       "id: " +
            //         response.data.results[i].id +
            //         " - end_date: " +
            //         response.data.results[i].detail.sponsorships[0].pivot.end_date
            //     );
            //   } else {
            //     console.log(
            //       "id: " +
            //         response.data.results[i].id +
            //         " - l'utente non ha sponsorizzazioni attive"
            //     );
            //   }
            // }
          } else {
            this.doctorsFound = false;
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.error("Non sono stati trovati dottori" + " error:" + error);
          this.doctorFound = false;
          this.isLoading = false;
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
  <!-- spinner - is loading page -->
  <div
    v-if="isLoading"
    class="text-center py-5 d-flex flex-column align-items-center justify-content-center gap-3 text-white spinner"
  >
    <div>Loading...</div>
    <div id="spinner-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  <!-- when loading is finished -->
  <div v-else>
    <section class="title-spec-form p-5 text-white">
      <h1 class="text-center pb-5 title-big">Benvenuto su BDoctors!</h1>
      <h4 class="subtitle text-center pb-5">
        Bdoctors è la piattaforma che unisce i migliori professionisti e ti
        permette di cercarli in comodità con un solo click!
      </h4>
      <form action="" id="mainspec-form">
        <label for="mainspec" class="pb-2"
          >Per iniziare, seleziona una specializzazione:</label
        >
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
    </section>

    <!-- doctors are found -->
    <div v-if="doctorsFound" class="container">
      <!-- sponsored doctors -->
      <h4 class="text-center mt-5 section-title">Medici in evidenza</h4>
      <div
        v-if="sponsoredPresent"
        class="__cards-container d-flex justify-content-center flex-wrap py-5"
      >
        <DoctorCard v-for="user in sponsoredUsers" :doctor="user"></DoctorCard>
      </div>
      <div v-else>
        <span>Non ci sono medici in evidenza</span>
      </div>

      <!-- non-sponsored doctors -->
      <h4 class="text-center mt-5 section-title">Tutti gli altri medici</h4>
      <div
        v-if="nonSponsoredPresent"
        class="__cards-container d-flex justify-content-center flex-wrap py-5"
      >
        <DoctorCard
          v-for="user in nonSponsoredUsers"
          :doctor="user"
        ></DoctorCard>
      </div>
      <div v-else>
        <span>Non ci sono altri medici</span>
      </div>
    </div>

    <!-- there are no doctors in the selected spec -->
    <div v-else>
      <div role="alert" class="alert alert-warning text-center">
        Nessun dottore trovato
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../components/style/_variables.scss" as *;
.title-spec-form {
  background-color: $blue;
  .title-big {
    text-shadow: 0px 3px 0px #b2a98f, 0px 10px 10px rgba(0, 0, 0, 0.15),
      0px 15px 2px rgba(0, 0, 0, 0.1), 0px 10px 30px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    text-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15),
      0px 8px 2px rgba(0, 0, 0, 0.1), 0px 10px 30px rgba(0, 0, 0, 0.1);
  }

  #mainspec-form {
    padding: 2rem;
    border-radius: 15px;
    background-color: $darker-blue;

    select {
      cursor: pointer;
    }
  }
}
.section-title {
  font-size: 32px;
  color: $green;
}

.__cards-container {
  gap: 20px;
  align-items: stretch;
}
</style>
