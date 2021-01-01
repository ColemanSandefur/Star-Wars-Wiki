<template>
  <div><a v-bind:href="data.link">{{ data.text }}</a></div>
</template>

<script>
export default {
  //data[]: {link, text}
  props: ["data"]
}
</script>

<style scoped>
div {
  height: 4rem;
  /* display: inline-block; */
}

a {
  font-size: 2rem;
  background-color: #2c2c2c;
  line-height: 4rem;
  height: 2.5rem;
  padding: .5rem;
  margin: .5rem .25rem;
  border-radius: 5px;
  color: white;
  text-decoration: none;
}
</style>
