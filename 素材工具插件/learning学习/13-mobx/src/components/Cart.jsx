import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('cartStore')
@observer
export default class Cart extends Component {
  render() {
    const {
      props: {
        cartStore: { cart, status, cartTotalPrice, settlement }
      }
    } = this
    return (
      <div>
        <h4>购物车组件 (展示添加过的商品 发起结算操作)</h4>
        <ul>
          {
            cart.map(v => (
              <li key={v.id}>
                <span>{v.title}</span> - <span>价格：{v.price}</span> - <span>购买数量：{v.number}</span>
              </li>
            ))
          }
        </ul>
        <p>总价格：{cartTotalPrice}</p>
        <button disabled={cart.length === 0 || status === 0} type="button" onClick={settlement}>结算</button>
      </div>
    )
  }
}