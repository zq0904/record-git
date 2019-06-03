import React from 'react'
import { observable, toJS, autorun, action, computed } from 'mobx'
import { observer } from 'mobx-react'

const state = observable({
  a: 1,
  add() { ++this.a }
}, {
  add: action.bound
})

autorun(() => {
  console.log(toJS(state)) // toJS 递归地将（可观察的）对象转换为javascript结构 (不包括计算属性)
})

@observer
export default class ToolFunction extends React.Component {
  // 不要拷贝 observables 属性存储在本地 如果真的需要应该使用计算属性
  @computed
  get ax100() { return state.a * 100 }
  render() {
    return (
      <div>
        <p>{JSON.stringify(state)}</p>
        <p>{this.ax100}</p>
        <button onClick={state.add}>更新</button>
      </div>
    )
  }
}
