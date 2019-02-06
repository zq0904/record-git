import { settlement } from '@/api'
import { UPDATECART, inventoryReduceById } from '../type'

export default {
  state: {
    status: 1, // 结算状态 0结算中
    cart: [] // [{ id: '1', title: 'iphone XR', price: 4999, number: 2 }]
  },
  getters: {
    getCart: state => state,
    getCartTotalPrice: ({ cart }) => cart.reduce((b, a) => b + a.price * a.number, 0)
  },
  mutations: {
    [UPDATECART] (state, payload = {}) {
      Object.assign(state, payload)
    }
  },
  actions: {
    addToCart ({ state: { cart }, commit, getters: { getGoodById } }, id) {
      const { title, price } = getGoodById(id)
      // 库存减少
      commit(inventoryReduceById, id)
      // cart中不存在
      if (!cart.some(v => v.id === id)) {
        cart.push({ id, title, price, number: 1 })
        return commit(UPDATECART, { cart })
      }
      // 存在
      const newCart = cart.map(v => {
        if (v.id === id) v.number++
        return v
      })
      commit(UPDATECART, { cart: newCart })
    },
    settlement ({ commit }) {
      // 正常是loading效果 以阻断用户操作 等待结算结果 这里仅使用 status模拟控制
      commit(UPDATECART, { status: 0 })
      settlement(() => {
        commit(UPDATECART, { status: 1, cart: [] })
        window.alert('结算成功')
      }, () => {
        commit(UPDATECART, { status: 1 })
        window.alert('结算失败，请稍后再试')
      })
    }
  }
}
