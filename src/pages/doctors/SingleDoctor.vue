<script>
import axios from "axios";
export default {
  name: "SingleDoctor",
  data() {
    return {
      doctor: {},
      doctorSlug: "",
      isLoading: true,
      doctorFound: false,
    };
  },
  mounted() {
    this.doctorSlug = this.$route.params.slug;
    this.getDoctor();
  },
  methods: {
    getDoctor() {
      axios
        .get("http://127.0.0.1:8000/api/users/" + this.doctorSlug)
        .then((response) => {
          console.log("doctor:", response);
          this.isLoading = false;
          if (response.data.success == true) {
            this.doctor = response.data.user;
            document.title = "BDoctor - " + this.doctor.name;
            this.doctorFound = true;
          } else {
            this.postFound = false;
          }
        });
    },
  },
};
</script>
<template>
  <div v-if="isLoading" id="spinner-container">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="container py-5">
    <div v-if="doctorFound">
      <h1>{{ doctor.name }} {{ doctor.surname }}</h1>
      <div>
        <span
          ><strong>Specializzazione principale: </strong
          >{{ doctor.mainspec }}</span
        >
      </div>

      <div>
        <span
          ><strong>Numero di telefono: </strong
          >{{ doctor.detail.phone_number }}</span
        >
      </div>
      <div>
        <span><strong>Servizi: </strong>{{ doctor.detail.services }}</span>
      </div>
      <div>
        <div v-if="doctor.reviews">
          <h6>Recensioni:</h6>
          <div>
            <ul>
              <li v-for="rev in doctor.reviews">
                <span>{{ rev.name }}</span> <br />
                <p>{{ rev.description }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger text-center" role="alert">
        No doctor found
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
