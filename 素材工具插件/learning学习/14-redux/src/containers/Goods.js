import { connect } from 'react-redux'
import Goods from '../components/Goods'
import { getAllGoods, addToCart } from '../actions'

function mapStateToProps(state) {
  return state
}

// 抽取actions
// function mapDispatchToProps(dispatch) {
//   return {
//     getAllGoods() { // 获取数据
//       dispatch(getAllGoods())
//     },
//     addToCart(id) { // 添加到购物车
//       dispatch(addToCart(id))
//     }
//   }
// }

// 简写 有传参也会透传进去
const mapDispatchToProps = {
  getAllGoods,
  addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goods)