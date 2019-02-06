<template>
  <div>
    商品组件 (展示商品 添加到购物车)
    <ul>
      <li v-for="v in getGoods.goods" :key="v.id">
        <span>{{v.title}}</span> - <span>价格：{{v.price}}</span> - <span>库存：{{v.inventory}}</span><br/>
        <button :disabled="v.inventory===0" @click="addToCart(v.id)">添加到购物车</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getGoods'])
  },
  created () {
    this.getAllGoods()
  },
  methods: {
    ...mapActions({
      getAllGoods: 'getGoods',
      addToCart: 'addToCart'
    })
  }
}
</script>

<style lang="scss">

</style>
