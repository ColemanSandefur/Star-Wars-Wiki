<template>
  <div>
    <data-entry
      v-for="(value, key) in person_data"
      v-bind:title="key"
      v-bind:information="value"
      v-bind:key="key"></data-entry>
  </div>
</template>

<script>
import {GetPage} from "@/services/GetPage";
import DataEntry from './data_entry/data_entry.vue';

export default {
  components: { DataEntry },
  name: "PeoplePage",
  data() {
    return {
      person_id: 1,
      person_data: {}
    }
  },
  methods: {
    async getPerson(id) {
      let data = await GetPage.getPerson(id);
      console.log(data);
      this.person_data = data;
    }
  },
  computed: {

  },
  mounted() {
    this.getPerson(this.person_id);
  },
}
</script>

<style>

</style>
