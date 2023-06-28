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
</style>
