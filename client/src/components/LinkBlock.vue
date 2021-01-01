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

</style>
