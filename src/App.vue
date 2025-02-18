<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<!--  <header>-->
    <div class="wrapper">
<!--      <HelloWorld msg="You did it!" />-->

    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/profile">Профиль</RouterLink>
    </nav>
    </div>
<!--  </header>-->

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
  padding-top: 200px;
  max-width: 600px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    padding-top: 200px;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
