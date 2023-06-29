<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  data() {
    return {};
  },

  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <AppHeader></AppHeader>

  <div id="outer-container">
    <router-view></router-view>
  </div>

  <AppFooter></AppFooter>
  <!-- page scroll up element  -->
  <a class="page-scroll-up" href="#">
    <i class="arrow-top fa-solid fa-arrow-up"></i>
    <i class="arrow-bottom fa-solid fa-arrow-up"></i>
  </a>
</template>

<style lang="scss" scoped>
@use "./components/style/_variables.scss" as *;
#outer-container {
  padding-top: $header-height;
  min-width: 300px;
  min-height: calc(100vh - $footer-height);
  max-width: 100%;
  max-height: 100%;
}

a {
  text-decoration: none;
}

.page-scroll-up {
  position: fixed;
  right: 1%;
  bottom: 12%;
  z-index: 999;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  text-align: center;
  font-size: 1.5rem;
  background-color: $green;
  cursor: pointer;
  overflow: hidden;

  i {
    display: block;
    color: white;
    transition: all 0.2s;
  }

  .arrow-top {
    transform: translateY(50%);
  }

  .arrow-bottom {
    transform: translateY(120%);
  }

  &:hover .arrow-top {
    transform: translateY(-120%);
  }

  &:hover .arrow-bottom {
    transform: translateY(-50%);
  }
}
</style>
