<template>
  <div>
    <link-block
      v-for="item in links"
      v-bind:data="item"
      v-bind:key="item.id"
    ></link-block>
  </div>
</template>

<script>
import LinkBlock from "./LinkBlock.vue"
export default {
  data() {
    return {
      links: [
        {id: 0, link: "http://localhost:8080/#/test", text: "test"}
      ]
    }
  },
  mounted() {
    setInterval(() => {
      this.ak++
    }, 1000)
  },
  components: {
    LinkBlock
  }
}
</script>

<style>
a {
  color: orange
}
</style>
