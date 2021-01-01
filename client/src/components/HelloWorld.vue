<template>
  <div class="hello">
    <link-bar></link-bar>
    <h1>Welcome to the Star Wars wiki!</h1>
  </div>
</template>

<script>
import LinkBar from "./LinkBar.vue"

export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  components: {
    LinkBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
