import { getGoods } from '@/api'
import { UPDATEGOODS, inventoryReduceById } from '../type'

export default {
  state: {
    goods: [] // [{ id: '1', title: 'iphone XR', price: 4999, inventory: 2 }]
  },
  getters: {
    getGoods: state => state,
    getGoodById ({ goods }) {
      return id => goods.find(v => v.id === id)
    }
  },
  mutations: {
    [UPDATEGOODS] (state, payload = {}) {
      Object.assign(state, payload)
    },
    // 减少库存
    [inventoryReduceById] ({ goods }, id) {
      goods.forEach(item => {
        if (item.id === id) item.inventory--
      })
    }
  },
  actions: {
    async getGoods ({ commit }) {
      const { data } = await getGoods()
      commit(UPDATEGOODS, { goods: data })
    }
  }
}
