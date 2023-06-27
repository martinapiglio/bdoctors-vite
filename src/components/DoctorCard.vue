<script>
export default {
  name: "DoctorCard",
  data() {
    return {};
  },

  props: {
    doctor: Object,
  },

  computed: {
    thumbnail() {
      if (this.doctor.detail.profile_pic == null) {
        console.log(this.doctor);
        return "http://127.0.0.1:8000/storage/profile_pic_folder/anonimo.jpg";
      } else {
        console.log(this.doctor);
        return (
          "http://127.0.0.1:8000/storage/" + this.doctor.detail.profile_pic
        );
      }
    },
  },

  methods: {
    getAverageVote() {
      let sum = 0;
      let votesArray = this.doctor.votes;

      for (let i = 0; i < votesArray.length; i++) {
        sum += votesArray[i].vote;
      }

      let averageVote = sum / votesArray.length;

      let roundedAverageVote = this.roundToTwoDecimalPlaces(averageVote);

      return roundedAverageVote;
    },

    roundToTwoDecimalPlaces(number) {
      return Math.round(number * 10) / 10;
    },
    thumbnailError(event) {
      event.target.src =
        "http://127.0.0.1:8000/storage/profile_pic_folder/anonimo.jpg";
    },
  },
};
</script>

<template>
  <div class="card __card">
    <img
      class="card-img-top"
      :src="thumbnail"
      @error="thumbnailError"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">{{ doctor.name }} {{ doctor.surname }}</h5>

      <div class="card-text mb-2">
        <label for="__mainspec"><strong>Specializzazione: </strong></label>
        <div id="__mainspec">{{ doctor.mainspec }}</div>
      </div>
      <div class="card-text">
        <label for="__descrizione"><strong>Descrizione:</strong></label>
        <p id="__descrizione">{{ doctor.description }}</p>
      </div>

      <strong>Altre specializzazioni: </strong>
      <!-- other specs -->
      <ul>
        <li v-for="spec in doctor.detail.specs">
          {{ spec.title }}
        </li>
      </ul>

      <div><strong>Voto medio: </strong>{{ getAverageVote() }} / 5</div>

      <div>
        <strong>Numero di recensioni</strong>: {{ doctor.reviews.length }}
      </div>
      <div class="py-3">
        <router-link
          :to="{
            name: 'doctor.show',
            params: { slug: doctor.slug, spec: doctor.mainspec },
          }"
          class="btn btn-outline-primary"
          >Mostra dettagli</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.__card {
  min-width: 300px;
  width: calc(100% / 3 * 1 - (10px / 3 * 2));
  background-color: #f7f9fb;
  color: #263c64;
  border: 2px solid #263c64;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid #263c64;
  }
}
</style>
