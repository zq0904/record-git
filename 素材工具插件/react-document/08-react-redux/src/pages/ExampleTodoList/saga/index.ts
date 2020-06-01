import { call, put, takeEvery, takeLatest, take, select, all } from 'redux-saga/effects'
import { ReturnPromiseType } from '../../../common/ts'
import { State } from '../store'
import { createTodoListAction, createTodoLoadingAction } from '../actions'
import {
  getTodoList,
  GetTodoList
} from '../service'
import { SAGA_GET_TODO_LIST } from '../types'


// call apply cps 最终都是调用某个函数传递参数 但是先生成对象由saga调用
// put 最终由dispatch去派发
// takeEvery 相当于原有的 redux-thunk 任务是一直被注册了
// takeLatest 自带一个防抖效果
// take 只会注册一次 执行后就销毁

// redux-saga 参考 https://www.jianshu.com/p/6f96bdaaea22

function* fetchTodoList (action: any) {
  console.log('fetchTodoList -> action', action)
  try {
    yield put(createTodoLoadingAction(true))
    const state: State = yield select()
    console.log('fetchTodoList -> select -> loading', state.todos.loading)
    const { flag, msg, data }: ReturnPromiseType<GetTodoList> = yield call(getTodoList)
    // 同时执行多个任务 类似Promise.all的行为
    // const [res1, res2] = yield [call(getTodoList), call(getTodoList)]
    if (flag !== 1) return alert(msg)
    yield put(createTodoListAction(data.list))
  } catch (err) {
    console.error(err)
  } finally {
    yield put(createTodoLoadingAction(false))
  }
}

function* watchFetchTodoList() {
  yield takeLatest(SAGA_GET_TODO_LIST, fetchTodoList)
}

// function* logger (action: any) {
//   const state = yield select()
//   console.log('logger action', action)
//   console.log('logger state after', state)
// }
// function* watchAndLog() {
//   // 通配符*模式
//   yield takeEvery('*', logger)
// }
function* watchAndLog() {
  // while (true) {
    const action = yield take('*')
    const state = yield select()
    console.log('logger action', action)
    console.log('logger state after', state)
  // }
}

export default function* rootSaga() {
  yield all([
    call(watchFetchTodoList),
    call(watchAndLog),
  ]) 
}