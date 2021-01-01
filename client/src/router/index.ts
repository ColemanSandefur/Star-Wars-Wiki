import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/main_page/HomePage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
