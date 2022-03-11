<template>
  <div id="app">
    <h1 class="font-semibold uppercase mb-10 text-2xl bg-dark-50 text-white pt-2 pb-2">Covid 19</h1>
    <home></home>
  </div>
</template>

<script>
import home from "./pages/home.vue"
export default {
  name: 'App',
  components: {
    home,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
