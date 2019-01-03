<template>
  <div class="container">
    <Aside></Aside>
    <router-view></router-view>    
  </div>
</template>

<script>
  import Aside from './Aside.vue';

  export default {
    data () {
      return {}
    },
    components:{
      Aside
    }
  }
</script>

<style scoped >
  
</style>

