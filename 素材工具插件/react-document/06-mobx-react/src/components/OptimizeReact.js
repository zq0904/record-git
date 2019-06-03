import React from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

// 尽量使用小组件 这意味着用户界面将会有更多部分具备彼此独立渲染的可能性
const state = new class {
  @observable a = 1
  @observable arr = new Array(9999).fill(1)
  @action add = () => ++this.a
  @action psuh = () => this.arr.push(1)
}

// 虽然
const Bad = observer(() => (
  <div>
    <p>{state.a}</p>
    <ul style={{height: 17,overflow: 'hidden'}}>
      { state.arr.map((v, i) => <li key={i}>{v}</li>) }
    </ul>
    <button onClick={state.add}>add</button>
    <button onClick={state.psuh}>psuh</button>
  </div>
))
// 对大型数据数组 应单独抽取成组件并使用observer优化 浅比较 1.保证arr没有改变时不会重复比较 2.仅arr改变时仅改变依赖的组件
// 打开开发者工具 Mobx Performance Any
// add方法改变a arr没有改变Lis组件浅比较完全知道arr没有改变不需要比较
// push方法改变arr 只有Lis组件依赖arr 只会从新渲染Lis
const Lis = observer(props => props.arr.map((v, i) => <li key={i}>{v}</li>))
const Good = observer(() => (
  <div>
    <p>{state.a}</p>
    <ul style={{height: 17,overflow: 'hidden'}}>
      <Lis arr={state.arr} />
    </ul>
    <button onClick={state.add}>add</button>
    <button onClick={state.psuh}>psuh</button>
  </div>
))

@observer
export default class OptimizeReact extends React.Component {
  render() {
    return (
      <div>
        <p>优化 React 组件渲染</p>
        <Bad />
        <hr/>
        <Good />
      </div>
    );
  }
}
