import React, { Component } from 'react'

export default class Foo extends Component {
  render() {
    const {
      props: {
        test,
        add,
        asyncAdd
      }
    } = this
    return (
      <div>
        Foo 组件
        <p>数量: {test.num}</p>
        <p>价格：{test.num * test.price}</p>
        <button type="button" onClick={add}>同步增加</button><br/>
        <button type="button" onClick={asyncAdd}>异步增加</button>
      </div>
    )
  }
}