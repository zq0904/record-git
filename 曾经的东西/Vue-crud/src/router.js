import VueRouter from 'vue-router';
import Home from './components/home/Home.vue';
import List from './components/crud/List.vue';
import New from './components/crud/New.vue';
import Update from './components/crud/Update.vue';

export default new VueRouter({
  linkActiveClass:'active',
  routes:[
  {
    path:'/',
    component: Home
  },
  {
    path:'/list',
    component: List
  },
  {
    path:'/list/new',
    component: New
  },
  {
    path:'/list/update',
    component: Update
  },
  ]
});
