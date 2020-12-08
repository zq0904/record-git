import { all } from 'redux-saga/effects'
import todo from './todo'

function * rootSaga() {
  // 并发注册
  yield all([
    ...todo,
  ])
}

export default rootSaga
