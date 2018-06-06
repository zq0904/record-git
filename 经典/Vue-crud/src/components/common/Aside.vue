<template>
<div class="col-sm-3 col-md-2 sidebar">
  <ul class="nav nav-sidebar">
      <router-link to="/" exact tag="li">
        <a>Home</a>
      </router-link>
      <router-link to="/list" tag="li">
        <a>CRUD</a>
      </router-link>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
