import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('testStore')
@observer
export default class Foo extends Component {
  render() {
    const {
      props: {
        testStore: { num, totalPrice, add, asyncAdd }
      }
    } = this
    return (
      <div>
        Foo 组件
        <p>数量: {num}</p>
        <p>价格：{totalPrice}</p>
        <button type="button" onClick={add}>同步增加</button><br/>
        <button type="button" onClick={asyncAdd}>异步增加</button>
      </div>
    )
  }
}