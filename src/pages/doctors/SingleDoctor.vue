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
        <span><strong>Specializzazione principale: </strong>{{ doctor.mainspec }}</span>
      </div>

      <div>
        <strong>Altre specializzazioni: </strong>
        <ul>
          <li v-for="spec in doctor.detail.specs">
            {{ spec.title }}
          </li>
        </ul>
      </div>

      <div>
        <span><strong>Servizi: </strong>{{ doctor.detail.services }}</span>
      </div>

      <strong>Indirizzo: </strong>{{ doctor.address }}

      <div><strong>Email: </strong>{{ doctor.email }}</div>

      <div class="mb-4">
        <span
          ><strong>Numero di telefono: </strong
          >{{ doctor.detail.phone_number }}</span
        >
      </div>

      <!-- send a message -->
      <div><strong>Invia un messaggio a questo dottore:</strong></div>
      <form action="" class="mb-5">

        <div>
          <label for="sender-name" class="col-md-4 col-form-label text-md-right">Nome</label>

          <div>
              <input id="sender-name" type="text" class="form-control" name="sender-name" required minlength="3" maxlength="50" autocomplete="sender-name" autofocus>
          </div>
        </div>

        <div>
          <label for="sender-email" class="col-md-4 col-form-label text-md-right">Email</label>

          <div>
              <input id="sender-email" type="email" class="form-control" name="sender-email" required minlength="3" maxlength="500" autocomplete="sender-email" autofocus>
          </div>
        </div>
        
        <div>
          <label for="subject" class="col-md-4 col-form-label text-md-right">Oggetto del messaggio</label>

          <div>
              <input id="subject" type="text" class="form-control" name="subject" required minlength="3" maxlength="100" autocomplete="subject" autofocus>
          </div>
        </div>

        <div>
          <label for="message" class="col-md-4 col-form-label text-md-right">Messaggio</label>

          <div class="mb-3">
              <textarea id="message" class="form-control" name="message" required minlength="3" maxlength="500"></textarea>
          </div>
        </div>

        <button class="btn btn-dark" type="submit">Invia messaggio</button>

      </form>

      <div>
        <div v-if="doctor.reviews">
          <div><strong>Recensioni:</strong></div>
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
