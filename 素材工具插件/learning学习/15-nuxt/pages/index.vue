<template>
  <section class="container">
    <nuxt-link to="/Bar">Bar</nuxt-link>
    <el-button type="primary" @click="() => $router.push({path: '/Bar'})">Bar</el-button>
    <nuxt-link to="/Foo">Foo</nuxt-link>
    <nuxt-link to="/Movie/onlineTheater">Movie</nuxt-link>
  </section>
</template>

<script>

export default {
}
</script>

<style lang="scss">

</style>
