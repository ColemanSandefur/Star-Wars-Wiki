<template>
  <div id="app">
    <img src="./assets/Star_Wars_Logo.svg" id="logo">
    <link-bar></link-bar>
    <router-view/>
  </div>
</template>

<script>
import LinkBar from "./components/link_bar/LinkBar.vue"
export default {
  name: 'App',
  components: {
    LinkBar
  }
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
body {
  margin: 0;
}
</style>
