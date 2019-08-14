import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './index.less'

@inject('testStore')
@observer
class Bar extends Component {
  componentDidMount() {
    console.log('Bar组件 componentDidMount', this.props)
  }
  render() {
    const { testStore } = this.props
    return (
      <div className="bar">
        Bar 组件
        <p>testStore.num 数量：{testStore.num}</p>
        <p>testStore.price 价格：{testStore.price}</p>
        <p>testStore.totalPrice 总价格：{testStore.totalPrice}</p>
        <p><button onClick={testStore.add}>testStore.add</button></p>
        <p><button onClick={testStore.asyncAdd}>testStore.asyncAdd</button></p>
        <p><button onClick={testStore.asyncAddFlow}>testStore.asyncAddFlow</button></p>
      </div>
    )
  }
}

export default Bar
