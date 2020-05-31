import { UPDATECART } from '../type'

const ds = {
  status: 1, // 结算状态 0结算中
  cart: [] // [{ id: '1', title: 'iphone XR', price: 4999, number: 2 }]
}

const cart = (state = ds, { type, payload }) => {
  switch(type) {
    case UPDATECART:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default cart
