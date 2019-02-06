<template>
  <div>
  购物车组件 (展示添加过的商品 发起结算操作)
  <ul>
    <li v-for="v in getCart.cart" :key="v.id">
      <span>{{v.title}}</span> - <span>价格：{{v.price}}</span> - <span>购买数量：{{v.number}}</span>
    </li>
  </ul>
  <p>总价格：{{getCartTotalPrice}}</p>
  <button :disabled="getCart.cart.length === 0 || getCart.status === 0" @click="settlement">结算</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getCart',
      'getCartTotalPrice'
    ])
  },
  methods: {
    ...mapActions(['settlement'])
  }
}
</script>

<style lang="scss">

</style>
