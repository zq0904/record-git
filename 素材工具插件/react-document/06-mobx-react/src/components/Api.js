import React from 'react';
import { observable, decorate, extendObservable, action, computed, autorun, when, reaction, runInAction, flow } from 'mobx'
import { observer } from 'mobx-react'

// 1.不使用class类 纯es5 应用mobx
// 默认行为是对任何键/值对应用observable.deep 对getter应用computed 只有action需要描述
// const state = observable({
//   todoList: [{ id: 1, text: '文本1' }],
//   // 获取偶数项
//   get getEven() {
//     return this.todoList.filter(v => v.id % 2 === 0)
//   },
//   add() {
//     const { todoList } = this
//     const id = todoList.length === 0 ? 0 : todoList[todoList.length -1].id + 1
//     todoList.push({ id, text: `文本${id}` })
//   },
// }, {
//   add: action.bound
// })

// 2.不使用class类 通过extendObservable 扩展构造函数 构造函数只能用与new
// function cla() {
//   extendObservable(this, {
//     todoList: [{ id: 1, text: '文本1' }],
//     get getEven() {
//       return this.todoList.filter(v => v.id % 2 === 0)
//     },
//     add() {
//       const { todoList } = this
//       const id = todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1
//       todoList.push({ id, text: `文本${id}` })
//     }
//   }, {
//     add: action.bound,
//   })
// }
// const state = new cla()

// 3.使用class类 但不使用装饰器语法 直接使用decorate函数
// 使用 decorate 时 必须指定所有的字段 没有指定的不会被观测
// const cla = decorate(
//   class {
//     todoList = [{ id: 1, text: '文本1' }];
//     get getEven() {
//       return this.todoList.filter(v => v.id % 2 === 0)
//     }
//     add() {
//       const { todoList } = this
//       const id = todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1
//       todoList.push({ id, text: `文本${id}` })
//     }
//   }, {
//     todoList: observable,
//     getEven: computed,
//     add: action.bound,
//   }
// )
// const state = new cla()

const state = new class Store {
  @observable num = 1;
  @observable arr = [{a:1, b:1}]; // 别名就是 observable.deep
  // @observable.deep arr = []; // 默认修饰符 转换可观察对象 是递归的
  // @observable.ref arr = []; // 禁用自动可观察转换 只创建引用 不会更新视图 JSX对象 DOM对象 history
  // @observable.shallow arr = [1, {a: 1}]; // 浅观测 只会在一个深度监听 arr[0]=1 arr.push({}) 会修改视图 arr.[1].a = 2 不会修改视图
  // @computed // 创建一个派生属性
  // get arrLength() { return this.arr.length }
  // set arrLength(length) { this.arr.length = length } // 总是在getter 之后定义setter setter不需要使用@computed
  @computed
  get fixedVal() { // 计算属性返回一个函数
    return index => this.arr[index]
  }
  @action.bound // action.bound 等同于 bind(this) 或者直接使用箭头函数
  update() {
    this.arr[0].a = 2
  }
  @action
  add = () => ++this.num
  // action 中的异步操作
  @action
  asyncA = () => {
    setTimeout(() => {
      // runInAction 就是 action(fn)() 语法糖 立执行的action
      runInAction(() => {
        ++this.num
      })
    }, 1000)
  }
  @action // 直接使用async函数 感觉@action应用于整个函数 但实际上在每个await之后一个异步函数将启动 所以仍需使用runInAction
  asyncB = async () => {
    const data = await new Promise(resolve => {
      setTimeout(() => resolve(1), 1000)
    })
    runInAction(() => {
      this.num = data
    }, 1000)
  }
  // flow 只能作为函数使用 不能作为装饰器使用 由于使用Generator必须bind(this) 好处是异步部分不需要手动操作包装runInAction
  asyncC = flow(function *() {
    try {
      const data = yield new Promise((resolve, reject) => {
        setTimeout(() => reject(999), 1000)
      })
      console.log('resolve')
      this.num = data
    } catch (err) {
      console.log('reject')
    }
  }).bind(this)
}()

// autorun 初始会执行一次 依赖的数据发生改变会再次执行 (适合执行一些副作用 记录日志等)
// const disposer = autorun(reaction => {
//   console.log('autorun', state.num)
//   reaction.dispose() // 用于在执行期间 清理autorun
// }, {
//   delay: 2000, // 防抖延迟 默认为0
// })
// disposer() // 清理autorun


// 当第一个函数返回值为true 执行第二个函数并自动清理when (when只会执行一次)
// const disposer = when(() => state.num > 3, () => console.log('when'))
// disposer() // 清理when
// 与async await结合使用
// ;(async () => {
//   await when(() => true) // 在没有第二个参数时 返回promise 当boolean为true时promise状态为resolve 否则为pending
//   () => console.log('when')
// })()

// 初始不会执行 第一个函数返回的数据发生改变 执行第二个函数 （autorun 是arr改变执行 reaction是arr.map(v => v.title)改变执行 更细粒度控制）
// reaction(() => state.arr.map(v => v.title), (data, reaction) => {
//   console.log('reaction', data)
//   reaction.dispose() // 清理reaction
// }, {
//   fireImmediately: false, // 初始是否执行 默认为false
//   delay: 0, // 防抖延迟 默认为0
// })


@observer
class Api extends React.Component {
  render() {
    console.log('Api this.props.state ->', this.props.state)
    return (
      <div>
        <h2>Api</h2>
        <p>todoList: { JSON.stringify(this.props.state.todoList) }</p>
        <p>getEven: { JSON.stringify(this.props.state.getEven) }</p>
        <button type="button" onClick={this.props.state.add}>添加数据</button>
        <hr/>
        <p>num: { JSON.stringify(this.props.state.num) }</p>
        <p>arr: { JSON.stringify(this.props.state.arr) }</p>
        <button onClick={this.props.state.asyncC}>更新</button>
      </div>
    );
  }
}

export default () => <Api state={state} />
