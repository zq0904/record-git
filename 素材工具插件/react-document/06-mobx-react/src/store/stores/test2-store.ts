import { observable, action, flow, computed } from 'mobx'
import RootStore from '../index'

class Test2Store {
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
  asyncAddNum = flow(function *(this: Test2Store) {
    try {
      const data = yield Promise.resolve(123)
      this.num = data
    } catch (err) {
      this.num = 0
    }
  })
}

export default Test2Store