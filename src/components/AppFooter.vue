<script>
export default {
  name: "AppFooter",

  data() {
    return {};
  },
  computed: {
    currentYear() {
      let currentYear = new Date().getFullYear();
      return currentYear;
    },
  },
};
</script>

<template>
  <div
    class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top"
  >
    <div class="col-md-4 d-flex align-items-center footer-el">
      <a href="/" class="mb-3 me-2 mb-md-0 text-decoration-none lh-1">
        <svg class="bi" width="30" height="24">
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>
      <span class="mb-3 mb-md-0"
        >© {{ currentYear }} Boolean Class #88 - Team 4</span
      >
    </div>

    <ul
      class="nav col-md-4 justify-content-end list-unstyled d-flex gap-4 px-5 footer-el"
    >
      <li class="ms-3">
        <a href="#"><i class="fa-brands fa-facebook"></i></a>
      </li>
      <li class="ms-3">
        <a href="#"><i class="fa-brands fa-twitter"></i></a>
      </li>
      <li class="ms-3">
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "./style/_variables.scss" as *;
.footer-el {
  span {
    font-weight: bold;
    color: $blue;
  }

  i {
    color: $green;
  }
}
</style>
