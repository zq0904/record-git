import React from 'react';
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const A = () => <div>A</div>
const B = () => <div>B</div>

// connected-react-router
class Index extends React.Component {
  state = {
    toggle: true
  }
  handleClick = () => this.props.add()
  asyncHandleClick =() => this.props.asyncAdd()
  handleClickPush = () => {
    // 使用Redux操作进行导航
    this.props.push(this.state.toggle ? '/ReduxSynchronous/A' : '/ReduxSynchronous/B')
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }))
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>redux同步</h2>
        <p>num: {this.props.test.num}</p>
        <p>price: {this.props.test.price}</p>
        <p>total price: {this.props.totalPrice}</p>
        <button onClick={this.handleClick}>添加数量</button>
        <button onClick={this.asyncHandleClick}>异步添加数量</button>
        <button onClick={this.handleClickPush}>store中同步路由状态 使用dispatch的形式变更路由</button>
        <Route path="/ReduxSynchronous/A" component={A} />
        <Route path="/ReduxSynchronous/B" component={B} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  get totalPrice() {
    return state.test.num * state.test.price
  }
})
const mapDispatchToProps = dispatch => {
  return {
    add() { dispatch({ type: 'add' }) },
    asyncAdd() {
      dispatch((dispatch, getState) => {
        setTimeout(() => {
          dispatch({ type: 'add' })
        }, 500)
      })
    },
    push(...args) { dispatch(push(...args)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
