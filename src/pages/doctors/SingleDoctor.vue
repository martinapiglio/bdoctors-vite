<script>
import axios from "axios";
export default {
  name: "SingleDoctor",
  data() {
    return {
      doctor: {},
      doctorSlug: "",

      // data from message form
      formData: {
        userId: "",
        name: "",
        email: "",
        subject: "",
        message: "",
      },

      // data from review form
      formReview: {
        userId: "",
        name: "",
        description: "",
      },

      // data from vote form
      formVote: {
        userId: "",
        voter: "",
        vote: "",
      },

      // variables to handle errors when one of the input validations messages/reviews/votes form sending is not fulfilled
      errorMessage: "",
      errorMessageFound: false,

      errorReview: "",
      errorReviewFound: false,

      errorVote: "",
      errorVoteFound: false,

      // loading page + doctor found variables
      isLoading: true,
      doctorFound: false,
    };
  },

  computed: {
    thumbnail() {
      if (this.doctor.detail.profile_pic == null) {
        return "http://127.0.0.1:8000/storage/profile_pic_folder/anonimo.jpg";
      } else {
        return (
          "http://127.0.0.1:8000/storage/" + this.doctor.detail.profile_pic
        );
      }
    },

    curriculum() {
      if (this.doctor.detail.curriculum) {
        return "http://127.0.0.1:8000/storage/" + this.doctor.detail.curriculum;
      } else {
        return "#";
      }
    },
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
          // set the userId var in formData + formReview + formVote
          this.formData.userId = response.data.user.id;
          this.formReview.userId = response.data.user.id;
          this.formVote.userId = response.data.user.id;

          this.isLoading = false;

          if (response.data.success == true) {
            this.doctor = response.data.user;
            document.title = "BDoctor - " + this.doctor.slug;

            this.doctorFound = true;
          } else {
            this.doctorFound = false;
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.error("lo user non esiste" + " error:" + error);
          this.doctorFound = false;
          this.isLoading = false;
        });
    },

    sendMessage() {
      axios
        .post("http://127.0.0.1:8000/api/messages", this.formData)
        .then((response) => {
          location.reload();

          this.formData.userId = "";
          this.formData.name = "";
          this.formData.email = "";
          this.formData.subject = "";
          this.formData.message = "";

          this.errorMessageFound = false;
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.data.errors) {
              // If errors is an object containing multiple messages
              this.errorMessageFound = true;
              this.errorMessage = Object.values(
                error.response.data.errors
              ).join(", ");
            } else if (error.response.data.message) {
              // If the server sends back a single message
              this.errorMessage = error.response.data.message;
            } else {
              this.errorMessage = "Si è verificato un errore sconosciuto";
            }
          } else if (error.request) {
            // The request was made but no response was received
            this.errorMessage = "Nessuna risposta ricevuta dal server";
          } else {
            // Something happened in setting up the request that triggered an Error
            this.errorMessage = error.message;
          }
        });
    },

    sendReview() {
      axios
        .post("http://127.0.0.1:8000/api/reviews", {
          userId: this.formReview.userId,
          name: this.formReview.name || "Utente Anonimo",
          description: this.formReview.description,
        })
        .then((response) => {
          location.reload();

          this.formReview.userId = "";
          this.formReview.name = "";
          this.formReview.description = "";

          this.errorReviewFound = false;
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.data.errors) {
              // If errors is an object containing multiple messages
              this.errorReviewFound = true;
              this.errorReview = Object.values(error.response.data.errors).join(
                ", "
              );
            } else if (error.response.data.message) {
              // If the server sends back a single message
              this.errorReview = error.response.data.message;
            } else {
              this.errorReview = "Si è verificato un errore sconosciuto";
            }
          } else if (error.request) {
            // The request was made but no response was received
            this.errorReview = "Nessuna risposta ricevuta dal server";
          } else {
            // Something happened in setting up the request that triggered an Error
            this.errorReview = error.message;
          }
        });
    },

    sendVote() {
      axios
        .post("http://127.0.0.1:8000/api/votes", {
          userId: this.formVote.userId,
          voter: this.formVote.voter || "Utente Anonimo",
          vote: this.formVote.vote,
        })
        .then((response) => {
          location.reload();

          this.formVote.userId = "";
          this.formVote.voter = "";
          this.formVote.vote = "";

          this.errorVoteFound = false;
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.data.errors) {
              // If errors is an object containing multiple messages
              this.errorVoteFound = true;
              this.errorVote = Object.values(error.response.data.errors).join(
                ", "
              );
            } else if (error.response.data.message) {
              // If the server sends back a single message
              this.errorVote = error.response.data.message;
            } else {
              this.errorVote = "Si è verificato un errore sconosciuto";
            }
          } else if (error.request) {
            // The request was made but no response was received
            this.errorVote = "Nessuna risposta ricevuta dal server";
          } else {
            // Something happened in setting up the request that triggered an Error
            this.errorVote = error.message;
          }
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
  <div v-else class="container py-5">
    <!-- single doctor is found -->
    <div v-if="doctorFound">
      <h1>{{ doctor.name }} {{ doctor.surname }}</h1>

      <img :src="thumbnail" style="width: 250px" alt="doctor profile pic" />

      <div>
        <span
          ><strong>Specializzazione principale: </strong
          >{{ doctor.mainspec }}</span
        >
      </div>

      <div>
        <strong>Altre specializzazioni: </strong>
        <ul>
          <li v-for="spec in doctor.detail.specs">
            {{ spec.title }}
          </li>
        </ul>
      </div>

      <div v-if="doctor.detail.curriculum" class="my-4">
        <a :href="curriculum" target="_blank" class="btn btn-primary"
          >Vedi il CV</a
        >
      </div>
      <div v-else>
        <i>Curriculum non disponibile</i>
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

      <form action="" method="POST" @submit.prevent="sendMessage" class="mb-5">
        <div>
          <label for="name" class="col-md-4 col-form-label text-md-right"
            >Nome *</label
          >

          <div>
            <input
              id="name"
              type="text"
              class="form-control"
              name="name"
              v-model="formData.name"
              required
              minlength="3"
              maxlength="50"
              autocomplete="name"
              autofocus
            />
          </div>
        </div>

        <div>
          <label for="email" class="col-md-4 col-form-label text-md-right"
            >Email *</label
          >

          <div>
            <input
              id="email"
              type="email"
              class="form-control"
              name="email"
              v-model="formData.email"
              required
              minlength="3"
              maxlength="500"
              autocomplete="email"
              autofocus
            />
          </div>
        </div>

        <div>
          <label for="subject" class="col-md-4 col-form-label text-md-right"
            >Oggetto del messaggio *</label
          >

          <div>
            <input
              id="subject"
              type="text"
              class="form-control"
              name="subject"
              v-model="formData.subject"
              required
              minlength="3"
              maxlength="100"
              autocomplete="subject"
              autofocus
            />
          </div>
        </div>

        <div>
          <label for="message" class="col-md-4 col-form-label text-md-right"
            >Messaggio *</label
          >

          <div class="mb-3">
            <textarea
              id="message"
              class="form-control"
              name="message"
              v-model="formData.message"
              required
              minlength="3"
              maxlength="500"
            ></textarea>
          </div>
        </div>

        <!-- erros -->
        <div v-if="errorMessageFound">
          {{ errorMessage }}
        </div>

        <div class="mb-3">
          I campi contrassegnati con un asterisco sono obbligatori
        </div>

        <button class="btn btn-dark" type="submit">Invia messaggio</button>
      </form>

      <!-- send a review -->
      <div><strong>Invia un recensione a questo dottore:</strong></div>

      <form action="" method="POST" @submit.prevent="sendReview" class="mb-5">
        <div>
          <label for="name" class="col-md-4 col-form-label text-md-right"
            >Nome</label
          >

          <div>
            <input
              id="name"
              type="text"
              class="form-control"
              name="name"
              v-model="formReview.name"
              minlength="3"
              maxlength="50"
              autocomplete="name"
              autofocus
            />
          </div>
        </div>

        <div>
          <label for="description" class="col-md-4 col-form-label text-md-right"
            >Recensione *</label
          >

          <div class="mb-3">
            <textarea
              id="description"
              class="form-control"
              name="description"
              v-model="formReview.description"
              required
              minlength="3"
              maxlength="500"
            ></textarea>
          </div>
        </div>

        <!-- erros -->
        <div v-if="errorReviewFound">
          {{ errorReview }}
        </div>

        <div class="mb-3">
          I campi contrassegnati con un asterisco sono obbligatori
        </div>

        <button class="btn btn-dark" type="submit">Lascia recensione</button>
      </form>

      <!-- vote the doctor -->
      <div><strong>Vota questo dottore:</strong></div>

      <form action="" method="POST" @submit.prevent="sendVote" class="mb-5">
        <div>
          <label for="voter" class="col-md-4 col-form-label text-md-right"
            >Nome</label
          >

          <div>
            <input
              id="voter"
              type="text"
              class="form-control"
              name="voter"
              v-model="formVote.voter"
              minlength="3"
              maxlength="50"
              autocomplete="voter"
              autofocus
            />
          </div>
        </div>

        <div>
          <label for="vote" class="col-md-4 col-form-label text-md-right"
            >Voto *</label
          >

          <div class="mb-3">
            <select
              class="form-select"
              name="vote"
              id="vote"
              v-model="formVote.vote"
              required
            >
              <option value="" disabled selected>
                Scegli un voto da assegnare al dottore
              </option>
              <option v-for="number in 5" :value="number">{{ number }}</option>
            </select>
          </div>
        </div>

        <!-- erros -->
        <div v-if="errorVoteFound">
          {{ errorVote }}
        </div>

        <div class="mb-3">
          I campi contrassegnati con un asterisco sono obbligatori
        </div>

        <button class="btn btn-dark" type="submit">Vota</button>
      </form>

      <!-- reviews -->
      <div>
        <div><strong>Recensioni:</strong></div>
        <div v-if="doctor.reviews.length > 0">
          <div>
            <ul>
              <li v-for="rev in doctor.reviews">
                <span>{{ rev.name }}</span> <br />
                <p>{{ rev.description }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <i>Non ci sono ancora recensioni per questo medico.</i>
        </div>
      </div>
    </div>

    <!-- the single doctor is not found -->
    <div v-else>
      <div class="alert alert-danger text-center" role="alert">
        Non è stato trovato nessun dottore
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
