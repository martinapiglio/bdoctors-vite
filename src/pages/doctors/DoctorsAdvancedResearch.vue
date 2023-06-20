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
    };
  },

  components: {
    DoctorCard,
  },

  mounted() {
    this.getFilteredDocs();
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
    }

  }
}

</script>

<template>

    <div v-for="user in users">
      <DoctorCard :doctor="user"></DoctorCard>
    </div>

</template>

<style></style>
