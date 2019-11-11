import { observable, action, computed, runInAction, flow, autorun, when, reaction } from 'mobx'

export default class TestStore {
  constructor(rootStore) { this.rootStore = rootStore }
  @observable num = 0 // 将普通的数据 变为可观测的数据
  @observable price = 100
  @action.bound // 自动 bind this
  add() { this.num ++ }
  @computed // 计算属性 依赖缓存
  get totalPrice() {
    return this.num * this.price
  }
  @action.bound
  asyncAdd() { // action中只能是 同步操作更改 可观测的数据
    setTimeout(() => {
      // 1.在声明一个action调用
      // this.UPDATESTORE({num: 99})
      // 2.声明一个立即调用的action
      // action(() => {
      //   this.num ++
      // })()
      // 3.使用runInAction
      runInAction(() => { this.num ++ })
    }, 500)
  }
  @action.bound UPDATESTORE(payload) {
    Object.assign(this, payload)
  }
  @action.bound
  asyncAdd2 = flow(function *() {
    yield Promise.resolve(1)
    this.num ++
  })
}

// // autorun 初始会执行一次 有点类似计算属性 依赖的可被观测的数据变动 就会执行业务函数
// const ts = new TestStore()
// autorun(() => {
//   console.log('autorun：', ts.num)
// })
// // ts.num = 1 // 直接修改 可观测的数据 是可以的 只不过不推选这么做 多次操作会多次执行 降低性能（对比vuex虽然也可以 但是不能被devTool检测到）
// // ts.num = 2
// ts.add()

// // when 满足条件 执行一次操作 之后不再执行
// when(() => ts.num >= 4, () => console.log('wehn：'))

// // reaction 初始不会执行 依赖的可被观测的数据变动 就会执行
// reaction(() => ts.num, (data, reaction) => {
//   console.log('reaction：', data)
//   // reaction.dispose() // 停止当前reaction的监听 实现和wen一样的效果
// })

// // 不定义action 直接使用runInAction 实现修改 可观测的数据 是合法的
// runInAction(() => {
//   ts.num = 4
// })