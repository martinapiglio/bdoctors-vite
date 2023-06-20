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
      userVote: '',
    };
  },

  components: {
    DoctorCard,
  },

  mounted() {
    this.getFilteredDocs();

    },

    computed: {
        getCosoleLog() {
            return console.log(this.userVote);
        }
    },

  methods: {
    getFilteredDocs() {
        axios.get('http://127.0.0.1:8000/api/users' + "?mainspec=" + this.spec).then((response) => {

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
        axios.get('http://127.0.0.1:8000/api/users' + '?vote=' + this.userVote).then((response) => {

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
    }

  }
}

</script>

<template>

    <form action="">
        <select
            class="form-select"
            name="vote"
            id="vote"
            v-model="userVote"
            @change="filteredByVotes"
            >
        <option value="">Tutti</option>
        <option v-for="number in 10" :value="number"> {{ number }} </option>
        </select>
    </form>

    <div v-for="user in users">
      <DoctorCard :doctor="user"></DoctorCard>
    </div>

</template>

<style></style>
