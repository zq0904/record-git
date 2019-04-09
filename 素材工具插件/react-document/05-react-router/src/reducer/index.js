import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' // 异步action中间件
import { connectRouter, routerMiddleware } from 'connected-react-router' // 将路由器状态与redux存储同步 (!!! 注意ConnectedRouter下不能嵌套BrowserRouter)
import { createBrowserHistory } from 'history'
import test from './reducers/test.js'

export const history = createBrowserHistory()

const RootReducer = combineReducers({
  router: connectRouter(history),
  test
})

export default createStore(
  RootReducer,
  applyMiddleware(routerMiddleware(history), thunk)
)