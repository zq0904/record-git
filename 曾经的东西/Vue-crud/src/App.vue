<template>
<div id="app">
  <app-navbar></app-navbar>
  <div class="container-fluid">
    <div class="row">
      <app-aside></app-aside>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <!-- 路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import AppNavbar from './components/common/Navbar.vue';
  import AppAside from './components/common/Aside.vue';

  export default {
    data (){
      return {}
    },
    components:{
      AppNavbar,
      AppAside
    }
  }

</script>

<style>
</style>
