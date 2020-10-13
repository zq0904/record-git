import {
  createStore,
  applyMiddleware,
  Dispatch as SourceDispatch,
} from 'redux'
import { useDispatch as useSourceDispatch } from 'react-redux'
import RootReducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { Actions } from '../types'

const sagaMiddleware = createSagaMiddleware() // 创建saga中间件

const store = createStore(
  RootReducer,
  applyMiddleware(
    sagaMiddleware
  )
)

// 执行rootSaga
sagaMiddleware.run(rootSaga)

export type State = ReturnType<typeof RootReducer>

export type Dispatch = SourceDispatch<Actions>
export const useDispatch = () => useSourceDispatch<Dispatch>()

export default store
