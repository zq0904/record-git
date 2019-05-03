import React from 'react';
import { decorate, observable, action, autorun } from 'mobx'
import { observer } from 'mobx-react'

// 1.不使用class形式
const state = observable({
  todoList: [{ id: 1, text: '文本1' }],
  add: action(function() {
    const { todoList } = this
    const id = (todoList[todoList.length -1] ? todoList[todoList.length -1 ].id : 0) + 1;
    todoList.push({
      id,
      text: `文本${id}`
    })
  }),
  get getEven() {
    return this.todoList.filter(v => v.id % 2 === 0)
  }
})
// 2.
// const state = observable({
//   todoList: [{ id: 1, text: '文本1' }],
//   add: function() {
//     const { todoList } = this
//     const id = (todoList[todoList.length -1] ? todoList[todoList.length -1 ].id : 0) + 1;
//     todoList.push({
//       id,
//       text: `文本${id}`
//     })
//   },
//   get getEven() {
//     return this.todoList.filter(v => v.id % 2 === 0)
//   }
// }, {
//   add: action // 或者以这种方式声明使用action 其他默认
// })

// 3.类不使用 装饰器语法 直接使用decorate函数
// decorate(class {
//   todoList: [{ id: 1, text: '文本1' }],
//   add() {
//     const { todoList } = this
//     const id = (todoList[todoList.length -1] ? todoList[todoList.length -1 ].id : 0) + 1;
//     todoList.push({
//       id,
//       text: `文本${id}`
//     })
//   },
//   get getEven() {
//     return this.todoList.filter(v => v.id % 2 === 0)
//   }
// }, {
//   todoList: observable,
//   add: action,
//   getEven: computed
// })


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
  handleClick = () => this.props.state.add()
  render() {
    console.log(this.props)
    return (
      <div>
        <button type="button" onClick={this.handleClick}>更新</button>
        <ul>
          {
            this.props.state.todoList.map(({id, text}) => (
              <li key={id}>{text}</li>
            ))
          }
        </ul>
        <p>getEven</p>
        <ul>
          {
            this.props.state.getEven.map(({id, text}) => (
              <li key={id}>{text}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default () => <Api state={state} />
