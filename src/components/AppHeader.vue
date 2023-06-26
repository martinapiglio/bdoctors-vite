<script>
export default {
  name: "AppHeader",

  data() {
    return {};
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between"
  >
    <div class="d-flex align-items-center" id="logo-home-container">
      <img
        class="img-fluid px-4"
        id="logo-img"
        src="/img/BDOCTORS-LogoB.jpg"
        alt="bdoctors-logo-img"
      />

      <div class="nav-item active">
        <a class="nav-link" href="#">Home </a>
      </div>
    </div>

    <div class="nav-item d-flex align-items-center gap-3">
      <span> Sei un dottore? </span>
      <a class="btn btn-primary" href="http://127.0.0.1:8000/register">
        Registrati
      </a>
      <a class="btn btn-primary" href="http://127.0.0.1:8000/login">
        Fai il login
      </a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 7rem;
  #logo-home-container {
    height: 100%;
    #logo-img {
      height: 100%;
    }
  }
}
</style>
