<script>
export default {
  name: "AppHeader",

  data() {
    return {};
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <span>bdoctors-header</span>
        <!-- <router-link
          class="navbar-brand"
          aria-current="page"
          :to="{ name: 'home' }"
          >Boolfolio</router-link
        > -->

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                :to="{ name: 'home' }"
                >Home</router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'projects.index' }"
                >All the projects</router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about' }"
                >Who am I?</router-link
              >
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>