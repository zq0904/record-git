import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('goodsStore', 'cartStore')
@observer
export default class Goods extends Component {
  componentWillMount() {
    this.props.goodsStore.getAllGoods()
  }
  render() {
    const {
      props: {
        goodsStore: { goods },
        cartStore: { addToCart }
      }
    } = this
    return (
      <div>
        <h4>商品组件 (展示商品 添加到购物车)</h4>
        <ul>
          {
            goods.map(v => (
              <li key={v.id}>
                <span>{v.title}</span> - <span>价格：{v.price}</span> - <span>库存：{v.inventory}</span><br/>
                <button disabled={v.inventory===0} onClick={() => addToCart(v.id)}>添加到购物车</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}