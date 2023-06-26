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

  <div>
    <router-view></router-view>
  </div>

  <AppFooter></AppFooter>
</template>

<style lang="scss"></style>
