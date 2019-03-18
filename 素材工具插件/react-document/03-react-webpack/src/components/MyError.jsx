// 错误边界 - 就是处理错误的组件
// 错误边界不会捕获以下错误
// 1.事件处理程序多
// 2.异步代码（例如setTimeout或requestAnimationFrame回调）
// 3.服务器端渲染
// 4.错误边界本身（而不是其子）中抛出的错误
// 错误边界类似 js中的 try catch {} 只有类组件可以是错误边界

import React, { Component } from 'react'

class MyError extends Component {
  state = {
    hasError: false
  }
  static getDerivedStateFromError(error) { // error 错误对象
    // 2.捕获到子组件的错误
    console.log('getDerivedStateFromError', error)
    return { hasError: true }
  }
  componentDidCatch(error, info) { // error 错误对象 info 错误组件信息
    console.log('componentDidCatch', error, info)
  }
  render() {
    const {
      state: {
        hasError
      }
    } = this
    return (hasError ? <div>组件加载发生了一些错误!</div> : this.props.children)
  }
}

class Success extends Component {
  componentWillMount() {
    throw new Error('componentWillMount就是出错了') // 1.组件出错
  }
  render() {
    return (
      <div>Success加载正常</div>
    )
  }
}

export default class Box extends Component {
  render() {
    return (
      <MyError>
        <Success/>
      </MyError>
    )
  }
}