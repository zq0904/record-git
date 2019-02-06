import { observable, action, computed } from 'mobx'
import { settlement } from '../../api'

export default class CartStore {
  @observable status = 1 // 结算状态 0结算中
  @observable cart = [] // [{ id: '1', title: 'iphone XR', price: 4999, number: 2 }]
  constructor(rootStore) { this.rootStore = rootStore }
  @computed
  get cartTotalPrice() {
    return this.cart.reduce((b, a) => b + a.price * a.number, 0)
  }
  @action.bound
  UPDATECART(payload = {}) { Object.assign(this, payload) }
  // 对比vuex区别：
  // mobx action 同步操作直接修改数据  异步操作必须再次调用action
  // vuex action 同步操作异步操作 都不能直接修改数据 修改数据必须落实到mutations
  @action.bound
  addToCart(id) { // 添加到购物车
    const {cart, rootStore} = this
    const {title, price} = rootStore.goodsStore.getGoodById(id)
    // 减少库存
    rootStore.goodsStore.reduceInventory(id)
    // cart中不存在
    if (!cart.some(v => v.id === id)) {
      return cart.push({ id, title, price, number: 1 })
    }
    // 存在
    cart.map(v => {
      if (v.id === id) v.number++
      return v
    })
  }
  @action.bound
  settlement() { // 结算操作
    // 正常是loading效果 以阻断用户操作 等待结算结果 这里仅使用 status模拟控制
    this.UPDATECART({ status: 0 })
    settlement(() => {
      this.UPDATECART({ status: 1, cart: [] })
      window.alert('结算成功')
    }, () => {
      this.UPDATECART({ status: 1 })
      window.alert('结算失败，请稍后再试')
    })
  }
}