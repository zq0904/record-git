import { configure } from 'mobx'
import TestStore from './stores/test'

configure({ enforceActions: 'observed' }) // 强制使用action去更改可观测的数据 开启严格模式

export default class RootStore {
  constructor() {
    this.testStore = new TestStore(this)
  }
}