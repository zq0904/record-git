<template>
  <div>
    <app-header :user="user" ></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from '../common/Header.vue';
import AppFooter from '../common/Footer.vue';
import axios from 'axios';

export default {
  data () {
    return {
      user: null //组件通信
    }
  },
  components:{
    AppHeader,
    AppFooter
  },
  //路由导航钩子 组件传值 为了解决同步显示问题 
  //只有路由了才能使用路由导航钩子 Header组件不是路由渲染出来的 使用不了
  async beforeRouteEnter(to,from,next) {
    try {
      const {data} = await axios.get('/api/session');
      next( vm => { //vm 相当于 this
        vm.user = data; 
      });
    } catch (err) {
      next();
    }
  }
}

</script>
<style>
</style>
