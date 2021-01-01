<template>
  <div id="app">
    <img src="./assets/Star_Wars_Logo.svg" id="logo">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9eabb8;
  background-color: black;
}
#logo {
  height: 20vh;
}
html {
  height: 100vh;
  background-color: black;
}
</style>
