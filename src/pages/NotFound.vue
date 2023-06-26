<script>
export default {
  name: "AppFooter",

  data() {
    return {};
  },
};
</script>

<template>
  <div class="container my-5 text-center">
    Pagina non trovata

    <div class="my-4">
      <router-link :to="{ name: 'home' }"
        >Torna alla homepage con tutti i dottori
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
