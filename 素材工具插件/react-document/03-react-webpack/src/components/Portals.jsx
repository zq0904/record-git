import ReactDOM from 'react-dom'
import React from 'react';

// js 原声 创建一个 父组件的DOM层次结构之外的DOM节点 通过React.createPortal管理这个节点内部 很灵活
const div = document.createElement('div')
div.setAttribute('id', 'portals')
const text = document.createTextNode('父组件的DOM层次结构之外的DOM节点')
div.appendChild(text)
document.getElementsByTagName('body')[0].appendChild(div)

function Portals() {
  return ReactDOM.createPortal(
    <div>
      <h4>React.createPortal 提供了一种将子项呈现在父元素之外的DOM层次结构的一种方式</h4>
      <button>按钮</button>
    </div>,
    document.getElementById('portals')
  )
}

export default class extends React.Component {
  state = { num: 1 }
  clickHandler = () => {
    this.setState(prevState => ({
      num: ++prevState.num
    }))
  }
  render() {
    return (
      // 虽然门户Portals组件 是在react根节点之外渲染的 但仍能够按事件冒泡的形式触发 相应事件 很灵活
      <div onClick={this.clickHandler}>
        <h4>{this.state.num}</h4>
        <Portals ></Portals>
      </div>
    );
  }
}
