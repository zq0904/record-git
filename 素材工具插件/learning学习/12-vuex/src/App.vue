<template>
  <div id="app">
    <!-- <Bar/>
    <hr> -->
    <!-- <Foo/>
    <hr> -->
    <Goods/>
    <hr>
    <Cart/>
  </div>
</template>

<script>
// import Bar from './components/Bar'
// import Foo from './components/Foo'
import Goods from './components/Goods'
import Cart from './components/Cart'

export default {
  name: 'app',
  components: {
    // Bar,
    // Foo,
    Goods,
    Cart
  }
}
</script>

<style>

</style>
