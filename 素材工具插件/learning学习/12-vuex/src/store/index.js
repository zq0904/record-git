import Vuex from 'vuex'
import Vue from 'vue'
import test from './modules/test'
import goods from './modules/goods'
import cart from './modules/cart'
import { myPlugin } from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV === 'development', // 只在开发环境才启用严格模式
  modules: {
    test,
    goods,
    cart
  },
  plugins: [myPlugin]
})
