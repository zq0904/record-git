import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' // 异步action中间件
// import logger from 'redux-logger' // 日志中间件
import test from './reducers/test'
import goods from './reducers/goods'
import cart from './reducers/cart'

// export default (state = {}, action = {}) => {
//   return {
//     test: test(state.test, action)
//   }
// }

const rootReducer = combineReducers({
  test,
  goods,
  cart
})
// redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// 创建store实例 第二个参数应用中间件
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// 订阅store变化
// store.subscribe(() => {
//   console.log(store.getState())
// })
// 重写dispatch 实现中间件功能
// const _dispatch = store.dispatch
// store.dispatch = action => {
//   console.log('before state：', store.getState())
//   console.log('action：', action)
//   _dispatch(action)
//   console.log('after state：', store.getState())
// }
// action生成器函数
// function Add() {
//   return {  type: 'add' }
// }
// function AsyncAdd() {
//   return (dispatch, getState) => {
//     setTimeout(() => {
//       dispatch({  type: 'add' })
//     }, 500)
//   }
// }
// 发起dispatch 调用action
// store.dispatch({  type: 'add' }) // 同步
// store.dispatch((dispatch, getState) => { // 异步
//   setTimeout(() => {
//     dispatch({  type: 'add' })
//   }, 500);
// })

export default store
