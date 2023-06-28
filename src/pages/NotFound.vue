<script>
export default {
  name: "AppFooter",

  data() {
    return {
      title: "Pagina non trovata",
    };
  },
};
</script>

<template>
  <div class="container my-5 text-center __ctn">
    <h1>{{ this.title.toUpperCase() }}</h1>
    <p>
      <strong
        ><i>
          Ci dispiace, ma sembra che tu abbia raggiunto una pagina che non
          esiste. Siamo qui per aiutarti e assicurarci che tu trovi ciò che stai
          cercando. Per favore, torna alla pagina principale o utilizza la barra
          di ricerca per trovare le informazioni di cui hai bisogno. Grazie per
          la tua comprensione e ci scusiamo per l'inconveniente.</i
        ></strong
      >
    </p>

    <div class="my-4 btn btn-primary">
      <router-link :to="{ name: 'home' }" class="home-link"
        ><strong>Torna alla homepage con tutti i dottori</strong>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.__ctn {
  h1 {
    color: red;
  }
  .home-link {
    color: white;
    text-decoration: none;
  }
}
</style>
