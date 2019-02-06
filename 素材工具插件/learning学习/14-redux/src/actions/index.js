import { UPDATEGOODS, UPDATECART } from '../store/type'
import { getAllGoods as getGoodsDate, settlement as account } from '../api'

// action生成器函数
export const getAllGoods = () => async (dispatch, getState) => { // 获取所有商品数据
  const { data } = await getGoodsDate()
  dispatch({
    type: UPDATEGOODS,
    payload: { goods: data }
  })
}
export const addToCart = (id) => (dispatch, getState) => { // 添加到购物车
  const {cart: {cart}, goods: {goods}} = getState()
  const {title, price} = goods.find(v => v.id === id)
  // 减少库存
  dispatch({
    type: 'reduceInventory',
    payload: { id }
  })

  const good = cart.find(v => v.id === id)
  // cart中不存在
  if (!good) {
    cart.push({ id, title, price, number: 1  })
    return dispatch({
      type: 'UPDATECART',
      payload: { cart }
    })
  }
  // cart中存在
  ++good.number
  dispatch({
    type: 'UPDATECART',
    payload: { cart }
  })
}
export const settlement = () => (dispatch, getState) => { // 结算操作
  dispatch({
    type: UPDATECART,
    payload: { status: 0 }
  })
  account(() => {
    dispatch({
      type: UPDATECART,
      payload: { status: 1, cart: [] }
    })
    window.alert('结算成功')
  },() => {
    dispatch({
      type: UPDATECART,
      payload: { status: 1 }
    })
    window.alert('结算失败，请稍后再试')
  })
}