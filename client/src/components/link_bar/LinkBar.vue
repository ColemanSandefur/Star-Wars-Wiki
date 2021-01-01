<template>
    <div class="linkBar">
      <link-block
        v-for="item in links"
        v-bind:data="item"
        v-bind:key="item.id"
      ></link-block>
    </div>
</template>

<script>
import LinkBlock from "./LinkBlock.vue"
import LinkBarData from "@/services/LinkBar"
export default {
  data() {
    return {
      links: []
    }
  },
  methods: {
    async getLinkBar() {
      let response = await LinkBarData.getLinkBar();
      let data = response.data;
      console.log(data);
      let i = 0;
      data.forEach(element => {
        element.text = element.name;
        element.link = `http://localhost:8080/#${element.link}`;
        element.id = i++;
      });
      this.links = data;
    }
  },
  mounted() {
    this.getLinkBar();
  },
  components: {
    LinkBlock
  }
}
</script>

<style scoped>
.linkBar {
  width: 100vw;
  background-color: #0f0f0f;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
