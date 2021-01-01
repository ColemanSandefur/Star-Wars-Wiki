import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/main_page/HomePage.vue';
import PeoplePage from "../components/people_page/PeoplePage.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: "/people",
      name: "PeoplePage",
      component: PeoplePage
    }
  ]
})
