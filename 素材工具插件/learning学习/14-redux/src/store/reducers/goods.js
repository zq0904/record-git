import { UPDATEGOODS, reduceInventory } from '../type'
// 默认值
const ds = {
  goods: [] // [{ id: '1', title: 'iphone XR', price: 4999, inventory: 2 }]
}

export default (state = ds, {type, payload}) => {
  switch(type) { // 相当于vuex中的mutation
    case UPDATEGOODS:
      return Object.assign({}, state, payload)
    case reduceInventory:
      state.goods.forEach(v => {
        if (v.id === payload.id) v.inventory--
      })
      return Object.assign({}, state)
    default:
      return state
  }
}