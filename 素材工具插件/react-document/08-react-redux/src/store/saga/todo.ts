import { call, put, select, all, takeEvery, takeLatest, take } from 'redux-saga/effects'
import { getTodoList as getTodoListService } from '../../service'
import { ReturnPromiseType } from '../../common/ts'
import { State } from '../index'
import {
  Actions,
  TodoSetStateActionType,
  TodoGetTodoListActionType,
  TodoGetTodoListAction,
  TodoGetInitialDataActionType,
  TodoGetInitialDataAction,
} from '../../types'

// redux-saga 参考 https://www.jianshu.com/p/6f96bdaaea22

// call apply cps 最终都是调用某个函数传递参数 但是先生成对象由saga调用
// put 最终由dispatch去派发
// takeEvery 相当于原有的 redux-thunk 任务是一直被注册了（或者说观测 有对应的action触发 就执行对应的函数）
// takeLatest 自带一个防抖效果
// take 只会注册一次 执行后就销毁

export function * getTodoList (action: TodoGetTodoListAction) {
  const state: State = yield select()
  console.log('getTodoList -> state', state)
  const id = '1'
  try {
    const { data }: ReturnPromiseType<typeof getTodoListService> = yield call(getTodoListService, id)
    yield put<Actions>({
      type: TodoSetStateActionType,
      payload: { list: data.list }
    })
  } catch (err) {
    console.error(err)
  }
}

export function * getInitialData (action: TodoGetInitialDataAction) {
  try {
    yield put<Actions>({
      type: TodoSetStateActionType,
      payload: {
        loading: true
      }
    })
    yield all([
      getTodoList({ type: TodoGetTodoListActionType }),
      getTodoList({ type: TodoGetTodoListActionType }),
    ])
  } catch (err) {
    console.error(err)
  } finally {
    yield put<Actions>({
      type: TodoSetStateActionType,
      payload: {
        loading: false
      }
    })
  }
}

// watcher saga
export default [
  // takeEvery 观测有对应的action触发 就执行对应的函数
  takeEvery(TodoGetTodoListActionType, getTodoList),
  takeEvery(TodoGetInitialDataActionType, getInitialData),
]
