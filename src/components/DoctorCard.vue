<script>
export default {
  name: "DoctorCard",
  data() {
    return {
      averageVote: this.getAverageVote(),
    };
  },

  props: {
    doctor: Object,
  },

  computed: {
    thumbnail() {
      if (this.doctor.detail.profile_pic == null) {
        console.log(this.doctor.votes);
        return "http://127.0.0.1:8000/storage/profile_pic_folder/anonimo.jpg";
      } else {
        return (
          "http://127.0.0.1:8000/storage/" + this.doctor.detail.profile_pic
        );
      }
    },
    fullStars() {
      const decimalPart = this.averageVote % 1;
      if (decimalPart < 0.3) {
        return Math.floor(this.averageVote);
      } else if (decimalPart >= 0.8) {
        return Math.ceil(this.averageVote);
      } else {
        return Math.floor(this.averageVote);
      }
    },
    hasHalfStar() {
      const decimalPart = this.averageVote % 1;
      return decimalPart >= 0.3 && decimalPart < 0.8;
    },
    emptyStars() {
      return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
    },
  },

  methods: {
    getAverageVote() {
      if (this.doctor.votes) {
        let sum = 0;
        let votesArray = this.doctor.votes;

        for (let i = 0; i < votesArray.length; i++) {
          sum += votesArray[i].vote;
        }

        let averageVote = sum / votesArray.length;

        let roundedAverageVote = this.roundToTwoDecimalPlaces(averageVote);

        return roundedAverageVote;
      } else {
        return null;
      }
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

      <div v-if="averageVote" class="__card-rate mb-2">
        <div><strong>Voto medio: </strong>{{ getAverageVote() }} / 5</div>
        <div class="d-flex gap-1">
          <span>
            <i v-for="star in fullStars" class="__star fa-solid fa-star"></i>
            <i
              v-if="hasHalfStar"
              class="__star fa-solid fa-star-half-stroke"
            ></i>
            <i v-for="star in emptyStars" class="__star fa-regular fa-star"></i>
          </span>
          <!-- <span v-else>No rating available</span> -->
        </div>
      </div>
      <div v-else>
        <strong>Voto medio: </strong>questo dottore non ha ancora alcun voto
      </div>

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
  min-width: 240px;
  width: calc(100% / 4 * 1 - (20px / 4 * 3));
  background-color: #f7f9fb;
  color: #263c64;
  border: 2px solid #263c64;
  img {
    object-fit: cover;
    width: 100%;
    height: 320px;
    object-position: top;
    border-bottom: 2px solid #263c64;
  }
  .__star {
    color: gold;
  }
}
</style>
