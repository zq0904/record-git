import { observable, action, computed } from 'mobx'
import { getAllGoods } from '../../api'

export default class GoodsStore {
  @observable goods = [] // [{ id: '1', title: 'iphone XR', price: 4999, inventory: 2 }]
  constructor(rootStore) { this.rootStore = rootStore }
  @computed
  get getGoodById() {
    return id => this.goods.find(v => v.id === id)
  }
  @action.bound
  UPDATEGOODS(paload) {
    Object.assign(this, paload)
  }
  @action.bound
  async getAllGoods() {
    const {data} = await getAllGoods()
    this.UPDATEGOODS({goods: data})
  }
  @action.bound
  reduceInventory(id) { // 减少库存
    this.goods.forEach(v => {
      if (v.id === id) v.inventory--
    })
  }
}