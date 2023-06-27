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

      // toggle reviews
      showMenu: false,
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
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
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
    thumbnailError(event) {
      event.target.src =
        "http://127.0.0.1:8000/storage/profile_pic_folder/anonimo.jpg";
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

      <hr />

      <img
        :src="thumbnail"
        style="width: 250px"
        alt="doctor profile pic"
        @error="thumbnailError"
      />

      <div>
        <label for="__mainspec"
          ><strong>Specializzazione principale: </strong></label
        >
        <div id="__mainspec">
          {{ doctor.mainspec }}
        </div>
      </div>

      <div>
        <label for="__other-specs"
          ><strong>Altre specializzazioni: </strong></label
        >
        <ul id="__other-specs">
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
        <label for="__services"><strong>Servizi: </strong></label>
        <div id="__services">{{ doctor.detail.services }}</div>
      </div>

      <div>
        <label for="__address"><strong>Indirizzo: </strong></label>
        <div id="__address">{{ doctor.address }}</div>
      </div>

      <div>
        <label for="__email"><strong>Email: </strong></label>
        <div id="__email">{{ doctor.email }}</div>
      </div>

      <div class="mb-4">
        <label for="__phone-number"
          ><strong>Numero di telefono: </strong></label
        >
        <div id="__phone-number">{{ doctor.detail.phone_number }}</div>
      </div>

      <hr />

      <!-- send a message -->
      <h5>Invia un messaggio a questo dottore:</h5>

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

        <div class="mb-3 __main-color">
          I campi contrassegnati con un asterisco sono obbligatori
        </div>

        <button class="btn btn-primary" type="submit">Invia messaggio</button>
      </form>

      <hr />

      <!-- send a review -->
      <h5>Invia un recensione a questo dottore:</h5>

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

        <div class="mb-3 __main-color">
          I campi contrassegnati con un asterisco sono obbligatori
        </div>

        <button class="btn btn-primary" type="submit">Lascia recensione</button>
      </form>

      <hr />
      <!-- vote the doctor -->
      <h5>Vota questo dottore:</h5>

      <form
        action=""
        method="POST"
        @submit.prevent="sendVote"
        class="mb-5 __main-color"
      >
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
          <label
            for="vote"
            class="col-md-4 col-form-label text-md-right __main-color"
            >Voto *</label
          >

          <div class="mb-3">
            <select
              class="form-select __main-color"
              name="vote"
              id="vote"
              v-model="formVote.vote"
              required
            >
              <option value="" class="__main-color" disabled selected>
                Scegli un voto da assegnare al dottore
              </option>
              <option v-for="number in 5" :value="number" class="__main-color">
                {{ number }}
              </option>
            </select>
          </div>
        </div>

        <!-- erros -->
        <div v-if="errorVoteFound">
          {{ errorVote }}
        </div>

        <div class="mb-3 __main-color">
          I campi contrassegnati con un asterisco sono obbligatori
        </div>

        <button class="btn btn-primary" type="submit">Vota</button>
      </form>

      <hr />
      <!-- reviews -->
      <div>
        <h5>Recensioni:</h5>

        <div v-if="doctor.reviews.length > 0" class="__main-color">
          <button class="btn btn-info" @click="toggleMenu">
            {{
              showMenu == false ? "Mostra recensioni" : "Nascondi Recensioni"
            }}
          </button>
          <div v-if="showMenu">
            <ul>
              <li v-for="rev in doctor.reviews">
                <label for="__reviewer-name"
                  ><strong>Recensore: </strong>
                </label>
                <div id="__reviewer-name">{{ rev.name }}</div>
                <label for="__review-text"><strong>Testo: </strong></label>
                <p id="__review-text">{{ rev.description }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="__main-color">
          <i>Non ci sono ancora recensioni per questo medico.</i>
        </div>
      </div>
    </div>

    <!-- the single doctor is not found -->
    <div v-else>
      <div class="alert alert-danger text-center __main-color" role="alert">
        Non è stato trovato alcun dottore
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1,
h5,
.__main-color {
  color: #263c64;
}

hr {
  border: none; /* Remove the default border */
  border-top: 3px solid #0c192f; /* Set the thickness and color of the top border */
}
label {
  color: #263c64;
}
</style>
