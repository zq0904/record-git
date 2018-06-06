<template>
<div>
  <h1 class="page-header">Dashboard</h1>
  <dashboard></dashboard>
  <h2 class="sub-header">Section title</h2>
  <home-list></home-list>
</div>
</template>

<script>
import Dashboard from './Dashboard.vue';
import HomeList from './HomeList.vue';

export default {
  data(){
    return {}
  },
  components:{
    Dashboard,
    HomeList
  }
};
</script>

<style>
</style>
