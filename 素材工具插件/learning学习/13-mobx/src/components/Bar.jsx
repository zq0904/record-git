import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('testStore')
@observer // 一但action更改store成员 自动更新视图
export default class Bar extends Component {
  componentWillMount() {
    // console.log(this.props)
  }
  render() {
    const {
      props: {
        testStore: { num, totalPrice, add, asyncAdd }
      }
    } = this
    return (
      <div>
        Bar 组件
        <p>数量: {num}</p>
        <p>价格：{totalPrice}</p>
        <button type="button" onClick={add}>同步增加</button><br/>
        <button type="button" onClick={asyncAdd}>异步增加</button>
      </div>
    )
  }
}