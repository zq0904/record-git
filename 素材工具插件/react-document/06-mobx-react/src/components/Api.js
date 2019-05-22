import React from 'react';
import { observable, decorate, extendObservable, action, computed, autorun } from 'mobx'
import { observer } from 'mobx-react'

// 1.不使用class类 纯es5 应用mobx
// 默认行为是对任何键/值对应用observable.deep 对getter应用computed 只有action需要描述
// const store = observable({
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
// const store = new cla()

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
// const store = new cla()

const store = new class {
  @observable arr = [1, 2]; // 别名就是 observable.deep
  // @observable.deep arr = []; // 默认修饰符 转换可观察对象 是递归的
  // @observable.ref arr = []; // 禁用自动可观察转换 只创建引用 不会更新视图 JSX对象 DOM对象 history
  // @observable.shallow arr = [1, {a: 1}]; // 浅观测 只会在一个深度监听 arr[0]=1 arr.push({}) 会修改视图 arr.[1].a = 2 不会修改视图
  // @computed // 创建一个派生属性
  // get arrLength() { return this.arr.length }
  // set arrLength(length) { this.arr.length = length } // 总是在getter 之后定义setter setter不需要使用@computed
  // @computed
  // get fixedVal() { // 计算属性返回一个函数
  //   return index => this.arr[index]
  // }
  @action.bound
  update() {
    this.arr.push(3)
  }

}

// autorun 初始会执行一次 依赖的数据发生改变会再次执行 (适合执行一些副作用 记录日志等)
autorun(() => {
  console.log('autorun', store.arr)
})
// const simple = observable.box('str') // 单独观测一个简单类型
// const obj = {}
// const map = observable(new Map([[obj, 'str']])) // 观测一个map类型
// autorun(() => {
//   console.log(simple.get(), map.get(obj))
// })
// simple.set(123)
// map.set(obj, 123)

@observer
class Api extends React.Component {
  render() {
    console.log('Api this.props ->', this.props.store)
    return (
      <div>
        <h2>Api</h2>
        <p>todoList: { JSON.stringify(this.props.store.todoList) }</p>
        <p>getEven: { JSON.stringify(this.props.store.getEven) }</p>
        <button type="button" onClick={this.props.store.add}>添加数据</button>
        <hr/>
        <p>{JSON.stringify(this.props.store.arr)}</p>
        <button onClick={this.props.store.update}>更新</button>
      </div>
    );
  }
}

export default () => <Api store={store} />