import React from 'react';
import { observable, action, autorun } from 'mobx'
import { observer } from 'mobx-react'

// Mobx 版本问题
// 5+ 任何支持ES6代理的浏览器
// 4+ 任何ES5兼容的浏览器 也是长期支持版 一般使用这个 npm i mobx@4 -S

// 定义状态并使其可观察
const state = new class {
  @observable time = 0
  @action.bound
  add() { // action中只能是 同步操作更改
    this.time += 1
  }
}

// autorun
// 初值 会执行一次
// 依赖的可被观测的数据变动 也会执行
// autorun(() => {
//   console.log('Base.js autorun：', state.time)
// })

@observer // 创建一个响应状态更改的视图
class Base extends React.Component {
  handleClick = () => this.props.state.add()
  // 虽然 this.props.state.time = 1 是可以直接修改了 但出于性能考虑 使用action修改才是最佳实践 开启严格模式的mobx不允许直接修改
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Base</h2>
        <p>{this.props.state.time}</p>
        <button onClick={this.handleClick}>更改</button>
      </div>
    );
  }
}

export default () => (
  <div>
    <Base state={state} />
  </div>
)
