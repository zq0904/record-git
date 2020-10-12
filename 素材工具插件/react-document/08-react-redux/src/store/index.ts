import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import RootReducer from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware() // 创建saga中间件

const store = createStore(
  RootReducer,
  applyMiddleware(
    thunkMiddleware,
    sagaMiddleware
  )
)

// 运行saga
sagaMiddleware.run(rootSaga)

// TODO 正常的Dispatch类型是ok的 但是redux-thunk的dispatch类型不包括
export type Dispatch = typeof store.dispatch

export type State = ReturnType<typeof RootReducer>

export default store
