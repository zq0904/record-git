import { observable, action, flow, computed } from 'mobx'
import RootStore from '../index'

class Test1Store {
  // eslint-disable-next-line no-useless-constructor
  constructor(private rootStore: RootStore) { }
  @observable
  num = 1
  @computed
  get price() {
    return this.num * 100
  }
  @action.bound
  addNum() { this.num += 1 }
  @action.bound
  asyncAddNum = flow(function *(this: Test1Store) { // 指定 this类型 为 实例类型
    try {
      const data = yield Promise.resolve(123)
      this.num = data
    } catch (err) {
      this.num = 0
    }
  })
}

export default Test1Store