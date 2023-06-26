<script>
export default {
  name: "AppHeader",

  data() {
    return {};
  },
};
</script>

<template>
  <div class="nav-cnt">
    <nav class="navbar navbar-expand-lg navbar-light bg-light ps-4">
      <a class="navbar-brand" href="#">logo</a>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
        </ul>

        <a class="nav-link" href="#">Sei un dottore?</a>
        <span>
          Sei un dottore?
          <a class="btn btn-primary" href="http://127.0.0.1:8000/register">
            Registrati
          </a>
          <a class="btn btn-primary mx-3" href="http://127.0.0.1:8000/login">
            Fai il login
          </a>
        </span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
