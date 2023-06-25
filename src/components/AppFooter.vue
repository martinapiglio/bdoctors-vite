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
    <div class="col-md-4 d-flex align-items-center">
      <a
        href="/"
        class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
      >
        <svg class="bi" width="30" height="24">
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>
      <span class="mb-3 mb-md-0 text-muted"
        >© {{ currentYear }} Boolean Class #88</span
      >
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex px-5">
      <li class="ms-3">
        <!-- <a class="text-muted" href="#"><i class="fa-brands fa-facebook"></i></a> -->
      </li>
      <li class="ms-3">
        <!-- <a class="text-muted" href="#"><i class="fa-brands fa-twitter"></i></a> -->
      </li>
      <li class="ms-3">
        <!-- <a class="text-muted" href="#"
          ><i class="fa-brands fa-instagram"></i
        ></a> -->
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
