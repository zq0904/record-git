import React from 'react';

// JSX 语法本质上 是 被转换成 React.createElement(component, props, ...children) 只要使用jsx 作用域中就必须引入React
console.log('React', React)

class Box extends React.Component {
  render() {
    console.log('Box this', this)
    const {
      props: { children }
    } = this
    return <div>{children}</div>
  }
}

// 使用.语法引用React组件
const O = {
  A() {
    return <div>O.A组件</div>
  },
  B() {
    return <div>O.B组件</div>
  }
}

export default class JSX extends React.Component {
  render() {
    const Component  = false ? O['A'] : O['B'] // 组件只支持.语法引用 不支持[]引用 只能提前判断
    return (
      <div>
        JSX语法 转换 等价
        {/* b的值为true 和html很相似 s的值为<3 会被转义 但是仍是字符串 */}
        <Box a={1} b s="&lt;3" d={'&lt;3'} {...{attr:1, props:2}}>asdqwe</Box>
        { React.createElement(Box, { a: 1 }, ['asd', 'qwe']) }<br />
        <O.A /><br />
        <Component /><br />
        {/* JSX 对 boolean undefined null 都不显示 但对0显示 所以在做一些[].length 判断显示 隐藏组件时 要使用 !== 0 判断 */}
        <div>{false}</div>
        <div>{true}</div>
        <div>{undefined}</div>
        <div>{null}</div>
        <div>{[].length !== 0 && [1, 2, 3]}</div>
      </div>
    );
  }
}
