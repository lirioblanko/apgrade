<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/profile">Профиль</RouterLink>
      </nav>
    </div>
  <RouterView />
</template>

<style scoped>
.wrapper{
  z-index: 9;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--vt-c-black);
}
nav {
  width: 400px;
  margin: 0 auto;
  display: flex;
  font-size: 1rem;
  text-align: center;
  padding: 1rem 0;
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
  color: var(--color-text);
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: #34d399;
}
</style>
