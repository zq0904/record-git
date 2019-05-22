import React from 'react';
import { observable, action, autorun } from 'mobx'
import { inject, observer } from 'mobx-react'

// Mobx 版本问题
// 5+ 任何支持ES6代理的浏览器
// 4+ 任何ES5兼容的浏览器 也是长期支持版 一般使用这个 npm i mobx@4 -S

// 定义状态并使其可观察
const store = new class {
  @observable time = 0
  @action.bound
  add() { this.time += 1 }
}

// autorun 初始会执行一次 依赖的可被观测的数据变动 就会执行
// autorun(() => {
//   console.log('Base.js autorun：', state.time)
// })

@inject('testStore')
@observer // 创建一个响应状态更改的视图
class Base extends React.Component {
  render() {
    console.log('Base.js this.props ->', this.props)
    return (
      <div>
        <h2>Base</h2>
        <h3>testStore</h3>
        <p>{this.props.testStore.num}</p>
        <button onClick={this.props.testStore.asyncAdd}>更改</button>
        <hr/>
        <h3>temporaryStore</h3>
        <p>{this.props.temporaryStore.time}</p>
        <button onClick={this.props.temporaryStore.add}>更改</button>
      </div>
    );
  }
}

export default () => (
  <div>
    <Base temporaryStore={store} />
  </div>
)
