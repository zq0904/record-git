import React from 'react';

// 没有JSX 的 react
// 其实 JSX 就是React.createElement(component, props, ...children)的语法糖
// props 没有需传递null
// children 多参 也支持数组 需提供key
let JSX = React.createElement('div', null,
  [
    React.createElement('h4', {key: '1'},
      'NoJSX'
    ),
    React.createElement('h4', {key: '2'},
      'NoJSX2'
    )
  ]
)

class NoJSX extends React.Component {
  render() {
    // return <div>Hello {this.props.toWhat}</div>
    return React.createElement('div', null, `Hello ${this.props.toWhat}`)
  }
}

export default () => React.createElement(NoJSX, {toWhat: 123})