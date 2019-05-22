import { configure } from 'mobx'
import TestStore from './stores/test'

configure({ enforceActions: 'observed' }) // 强制使用action去更改可观测的数据 开启严格模式
// 开启严格模式好处 性能优化（直接修改 可观测的数据 是可以的 只不过不推选这么做 多次操作会多次执行 降低性能（对比vuex虽然也可以 但是不能被devTool检测到））

export default class RootStore {
  constructor() {
    this.testStore = new TestStore(this)
  }
}