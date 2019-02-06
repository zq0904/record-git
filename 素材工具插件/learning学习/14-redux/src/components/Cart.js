import React, {Component} from 'react'

export default class Cart extends Component {

  render() {
    console.log(this.props)
    const {
      props: {
        cart,
        cartTotalPrice,
        settlement
      }
    } = this
    return (
      <div>
        <h4>购物车组件 (展示添加过的商品 发起结算操作)</h4>
        <ul>
          {
            cart.cart.map(v => (
              <li key={v.id}>
                <span>{v.title}</span> - <span>价格：{v.price}</span> - <span>购买数量：{v.number}</span>
              </li>
            ))
          }
        </ul>
        <p>总价格：{cartTotalPrice}</p>
        <button disabled={cart.cart.length === 0 || cart.status === 0} type="button" onClick={settlement}>结算</button>
      </div>
    )
  }
}