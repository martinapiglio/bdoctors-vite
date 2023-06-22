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

      formData: {
        userId: '',
        name: '',
        email: '',
        subject: '',
        message: '',
      },

      formReview: {
        userId: '',
        name: '',
        description: '',
      },

      formVote: {
        userId: '',
        voter: '',
        vote: '',
      }

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
          // set the userId var in formData + formReview + formVote
          this.formData.userId = response.data.user.id;
          this.formReview.userId = response.data.user.id;
          this.formVote.userId = response.data.user.id;

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

    sendMessage() {
      axios.post('http://127.0.0.1:8000/api/messages', this.formData)
        .then(response => {

          this.formData.userId = '';
          this.formData.name = '';
          this.formData.email = '';
          this.formData.subject = '';
          this.formData.message = '';
        });
    },

    sendReview() {

      if(this.formReview.name == '') {
        this.formReview.name = 'Utente Anonimo'
      } 

      axios.post('http://127.0.0.1:8000/api/reviews', this.formReview)
        .then(response => {

          this.formReview.userId = '';
          this.formReview.name = '';
          this.formReview.description = '';
        });
    },

    sendVote() {

      if(this.formVote.voter == '') {
        this.formVote.voter = 'Utente Anonimo'
      } 

      axios.post('http://127.0.0.1:8000/api/votes', this.formVote)
        .then(response => {

          this.formVote.userId = '';
          this.formVote.voter = '';
          this.formVote.vote = '';
        });
    }

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

      <form action="" method="POST" @submit.prevent="sendMessage" class="mb-5">

        <div>
          <label for="name" class="col-md-4 col-form-label text-md-right">Nome</label>

          <div>
              <input id="name" type="text" class="form-control" name="name" v-model="formData.name" required minlength="3" maxlength="50" autocomplete="name" autofocus>
          </div>
        </div>

        <div>
          <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

          <div>
              <input id="email" type="email" class="form-control" name="email" v-model="formData.email" required minlength="3" maxlength="500" autocomplete="email" autofocus>
          </div>
        </div>
        
        <div>
          <label for="subject" class="col-md-4 col-form-label text-md-right">Oggetto del messaggio</label>

          <div>
              <input id="subject" type="text" class="form-control" name="subject" v-model="formData.subject" required minlength="3" maxlength="100" autocomplete="subject" autofocus>
          </div>
        </div>

        <div>
          <label for="message" class="col-md-4 col-form-label text-md-right">Messaggio</label>

          <div class="mb-3">
              <textarea id="message" class="form-control" name="message" v-model="formData.message" required minlength="3" maxlength="500"></textarea>
          </div>
        </div>

        <button class="btn btn-dark" type="submit">Invia messaggio</button>

      </form>

      <!-- send a review -->
      <div><strong>Invia un recensione a questo dottore:</strong></div>

      <form action="" method="POST" @submit.prevent="sendReview" class="mb-5">

        <div>
          <label for="name" class="col-md-4 col-form-label text-md-right">Nome</label>

          <div>
              <input id="name" type="text" class="form-control" name="name" v-model="formReview.name" minlength="3" maxlength="50" autocomplete="name" autofocus>
          </div>
        </div>

        <div>
          <label for="description" class="col-md-4 col-form-label text-md-right">Recensione</label>

          <div class="mb-3">
              <textarea id="description" class="form-control" name="description" v-model="formReview.description" required minlength="3" maxlength="500"></textarea>
          </div>
        </div>

        <button class="btn btn-dark" type="submit">Lascia recensione</button>

      </form>

      <!-- vote a doctor -->
      <div><strong>Vota questo dottore:</strong></div>

      <form action="" method="POST" @submit.prevent="sendVote" class="mb-5">

        <div>
          <label for="voter" class="col-md-4 col-form-label text-md-right">Nome</label>

          <div>
              <input id="voter" type="text" class="form-control" name="voter" v-model="formVote.voter" minlength="3" maxlength="50" autocomplete="voter" autofocus>
          </div>
        </div>

        <div>
          <label for="vote" class="col-md-4 col-form-label text-md-right">Voto</label>

          <div class="mb-3">
            <select class="form-select" name="vote" id="vote" v-model="formVote.vote" required>
              <option value="" disabled selected>Scegli un voto da assegnare al dottore</option>
              <option v-for="number in 5" :value="number">{{ number }}</option>
            </select>
          </div>

         </div>

        <button class="btn btn-dark" type="submit">Vota</button>

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
