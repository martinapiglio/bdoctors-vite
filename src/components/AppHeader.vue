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

      <div class="nav-item active links-container">
        <a class="nav-link links" href="/">Home </a>
      </div>
    </div>

    <div class="nav-item d-flex align-items-center gap-3 px-4">
      <span id="are-u-doctor"> Sei un dottore? </span>
      <div class="links-container">
        <a class="links" href="http://127.0.0.1:8000/register"> Registrati </a>
      </div>
      <div class="links-container">
        <a class="links" href="http://127.0.0.1:8000/login"> Fai il login </a>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "./style/_variables.scss" as *;
nav {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: $header-height;
  #logo-home-container {
    height: 100%;
    #logo-img {
      height: 100%;
    }
  }
  #are-u-doctor {
    color: $blue;
  }

  router-link {
    text-decoration: none;
  }

  .links-container {
    position: relative;
    transition: all 0.2s;
    .links {
      position: relative;
      font-weight: bold;
      transition: all 0.2s;
      text-decoration: none;
    }

    .links::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      top: 1.3rem;
      left: 0;
      background-color: $green;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    .links:hover {
      color: $green;
    }
  }

  .links-container:hover {
    color: $green;
    cursor: pointer;
    .links::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
}
</style>
