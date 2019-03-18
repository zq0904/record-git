import React from 'react';

class Box extends React.Component {
  render() {
    const { x, y } = this.props
    return (
      <div>
        <p>x：{x}</p>
        <p>y：{y}</p>
      </div>
    );
  }
}

// render props 目的：在React组件之间共享代码的技术 本质：是一个props函数 可以动态确定要渲染的东西并将内部状态传递
class Common1 extends React.Component {
  state = {
    x: 0,
    y: 0,
  }
  handlerMousemove = ({ clientX, clientY }) => {
    this.setState({ x: clientX, y: clientY })
  }
  render() {
    return (
      <div style={{height: '800px'}} onMouseMove={this.handlerMousemove}>
        { this.props.render(this.state) }
      </div>
    )
  }
}
// 基于 render props 实现一个HOC
function withCommon1(C) {
  return class extends React.Component {
    r = data => <C {...data}/>
    render() {
      return <Common1 render={this.r} />
    }
  }
}

// 通过props.children实现类似功能
class Common2 extends React.Component {
  state = {
    x: 0,
    y: 0,
  }
  handlerMousemove = ({ clientX, clientY }) => {
    this.setState({ x: clientX, y: clientY })
  }
  render() {
    const Children = this.props.children
    return (
      <div style={{height: '800px'}} onMouseMove={this.handlerMousemove}>
        { /* React.createElement(Children, this.state, null) */ }
        <Children {...this.state} />
      </div>
    )
  }
}

// export default () => (<Common1 render={data => <Box {...data}/>} />)

const WithCommon1 = withCommon1(Box)
export default () => <WithCommon1/>

// export default () => (<Common2>{Box}</Common2>)
