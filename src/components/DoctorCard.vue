<script>
export default {
  name: 'DoctorCard',
  data() {
    return {
      
    }
  },

  props: {
    doctor: Object,
  },

  computed: {
    thumbnail() {
      // console.log(this.doctor.detail);
      if(this.doctor.detail.profile_pic == null) {
        return 'http://127.0.0.1:8000/storage/profile_pic_folder/anonimo.jpg';
      } else {
        return 'http://127.0.0.1:8000/storage/' + this.doctor.detail.profile_pic;
      }
    },

  },

  methods: {
    getAverageVote() {
      let sum = 0;
      let votesArray = this.doctor.votes;

      for(let i = 0; i < votesArray.length; i++) {
        sum += votesArray[i].vote;
      }

      let averageVote = sum / votesArray.length;

      let roundedAverageVote = this.roundToTwoDecimalPlaces(averageVote);

      return roundedAverageVote;
    },

    roundToTwoDecimalPlaces(number) {
      return Math.round(number * 10) / 10;
    }
  }

}
</script>

<template>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="thumbnail" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ doctor.name }} {{ doctor.surname }}</h5>
        <div class="card-text"><strong>Specializzazione: </strong> {{ doctor.mainspec }}</div>
        <div class="card-text">{{ doctor.description }}</div>
        <p class="card-text"><strong>Prestazioni: </strong> {{ doctor.detail.services }}</p>
        <strong>Altre specializzazioni: </strong>
        <!-- specs -->
        <ul>
          <li v-for="spec in doctor.detail.specs">
            {{ spec.title }}
          </li>
        </ul>
        <!-- reviews -->
        <!-- <ul>
          <li v-for="review in doctor.reviews">
            {{ review.name }}
          </li>
        </ul> -->

        <div> Voto medio: {{ getAverageVote() }} / 10</div>

        <!-- voti:
        <ul>
          <li v-for="vote in doctor.votes">
            {{ vote.voter }} {{ vote.vote }}
          </li>
        </ul> -->

        <div class="card-text"><strong>Indirizzo: </strong>{{ doctor.address }}</div>
        <div class="card-text"><strong>Email: </strong>{{ doctor.email }}</div>
        <div class="card-text mb-3"><strong>Num. telefono: </strong>{{ doctor.detail.phone_number }}</div>
        <a href="#" class="btn btn-primary">Dettagli</a>
      </div>
    </div>
</template>

<style>
</style>