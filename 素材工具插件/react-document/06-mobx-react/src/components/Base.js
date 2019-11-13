import React from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

// Mobx 版本问题
// 5+ 任何支持ES6代理的浏览器
// 4+ 任何ES5兼容的浏览器 也是长期支持版 一般使用这个 npm i mobx@4 -S

// 定义状态并使其可观察
const store = new class {
  @observable time = 0
  @observable arr = [1]
  @action.bound
  addTime() { this.time += 1 }
  @action.bound
  addArr() { this.arr.push(1) }
}()

// 纯es5方式完全等价 const Api = observer(class {}) 如对无状态组件 observer(() => {})
const Box = observer(props => <p>{JSON.stringify(props.arr)}</p>)

@inject('testState')
@observer // observer 如果与其他装饰器一起使用 observer一定要在最里面的调用
class Base extends React.Component {
  state = { num: 1 }
  // componentWillReact() { // observer 提供的一个生命周期钩子 在mobx-react@6已经移除
  //   console.log('componentWillReact') // 当一个组件被安排重新渲染时将触发
  // }
  render() {
    console.log('Base.js this.props ->', this.props)
    return (
      <div>
        <h2>Base</h2>
        <h3>state</h3>
        <p>{this.state.num}</p>
        <button onClick={() => this.setState({ num: 9 })}>更改</button>
        <hr/>
        <h3>testState</h3>
        <p>{this.props.testState.num}</p>
        <button onClick={this.props.testState.asyncAdd}>更改</button>
        <hr/>
        <h3>temporaryStore</h3>
        <p>{this.props.temporaryStore.time}</p>
        <button onClick={this.props.temporaryStore.addTime}>更改</button>
        <hr/>
        <p>被@observer装饰器所修饰的组件 会添加类似shouldComponentUpdate 只有该组件“真实用到的”store发生改变才会更新该组件</p>
        <Box arr={this.props.temporaryStore.arr}></Box>
        <button onClick={this.props.temporaryStore.addArr}>更改arr 只有子组件会发生变化 父组件是不会更新的 这是极大的性能优化</button>
      </div>
    );
  }
}

export default () => (
  <div>
    <Base temporaryStore={store} />
  </div>
)
