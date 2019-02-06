import { connect } from 'react-redux'
import Cart from '../components/Cart'
import { settlement } from '../actions'

function mapStateToProps(state) {
  return {
    ...state,
    // 这里 相当于vuex的getter
    cartTotalPrice: state.cart.cart.reduce((b, a) => b + a.price * a.number, 0)
  }
}

const mapDispatchToProps = {
  settlement
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)