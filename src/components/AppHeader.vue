<script>
export default {
  name: "AppHeader",

  data() {
    return {
      visible: false,
    };
  },
};
</script>

<template>
  <!-- <nav
    class="navbar navbar-expand-lg navbar-light bg-white shadow-sm d-flex justify-content-between"
  >
    <div class="d-flex align-items-center" id="logo-home-container">
      <img
        class="img-fluid p-3"
        id="logo-img"
        src="/img/BDOCTORS-LogoB.jpg"
        alt="bdoctors-logo-img"
      />

      <div class="nav-item active links-container">
        <a class="nav-link links" href="/">Home </a>
      </div>
    </div>

    <div class="nav-item d-flex align-items-center gap-3 px-4">
      <span id="are-u-doctor" class="navbar-nav"> Sei un dottore? </span>
      <div class="links-container">
        <a class="links" href="http://127.0.0.1:8000/register"> Registrati </a>
      </div>
      <div class="links-container">
        <a class="links" href="http://127.0.0.1:8000/login"> Fai il login </a>
      </div>
    </div>
  </nav> -->
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white shadow-sm custom-nav"
  >
    <div class="logo-cont p-3">
      <img
        class="img-fluid immagine"
        src="/img/BDOCTORS-LogoB.jpg"
        alt="logone"
      />
    </div>
    <button
      @click="visible = !visible"
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="{{ __('Toggle navigation') }}"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="navbar-collapse mb-3"
      :class="!visible ? 'collapse' : ''"
      id="navbarSupportedContent"
    >
      <!-- Left Side Of Navbar -->
      <ul class="navbar-nav me-auto">
        <li class="nav-item links-container">
          <a class="links" href="/">Home</a>
        </li>
      </ul>

      <!-- Right Side Of Navbar -->
      <ul class="navbar-nav ml-auto d-flex gap-3 align-items-center">
        <li class="nav-item links-container">
          <span id="are-u-doctor" class="nav-link"> Sei un dottore? </span>
        </li>

        <li class="nav-item links-container">
          <a class="links" href="http://127.0.0.1:8000/register">Registrati</a>
        </li>

        <li class="nav-item links-container">
          <a class="links" href="http://127.0.0.1:8000/login">Login</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "./style/_variables.scss" as *;

.custom-nav {
  padding: 0 5rem 0;
  position: fixed;
  z-index: 2;
  width: 100%;
  min-height: $header-height;
  .logo-cont {
    height: $header-height;
    .immagine {
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
      color: $blue;
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
