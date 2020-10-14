import { getListInfo } from '../services'
import { matchPath } from 'dva/router'
import { PATH_HOME } from '../router/path'
import { Model } from 'dva'
import { ReturnPromiseType } from '../common/ts'
import { HomeNamespace, HomeState } from '../types'

const initialState: HomeState = {
  list: [], // 列表数据
  totalCount: 0,
}

const model: Model = {

  namespace: HomeNamespace,

  state: initialState,

  // 同步 Action 处理器
  reducers: {
    setState (state: HomeState, action) {
      return { ...state, ...action.payload }
    },
  },

  // 异步 Action 处理器
  // 1. select：用于获取state 减少从视图透传state
  // 2. call：执行异步函数
  // 3. put：发出一个 Action，类似于 dispatch
  // 4. all：类似于 Promise.all 并发执行 只要有一个reject 后面都不会执行
  effects: {
    *getListInfo (action, { call, put, select }) {
      // const state = yield select(({ Home }) => Home)
      try {
        const { list, totalCount }: ReturnPromiseType<typeof getListInfo> = yield call(getListInfo)
        yield put({
          type: 'setState',
          payload: { list, totalCount }
        })
      } catch (err) {
        console.error(err)
      }
    },

    *getInitialData (action, { all, call, put }) {
      // 这里目前 测试使用的这种方式 来达到并发 互相不影响
      console.time('1')
      yield all([
        yield put({ type: 'getListInfo' }),
        yield put({ type: 'getListInfo' })
      ])
      console.timeLog('1')
    },
  },

  subscriptions: {
    // 这个model被挂载 会执行
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = matchPath(pathname, { path: PATH_HOME, exact: true })
        if (match !== null) {
          // 初始化数据
          dispatch({ type: 'getInitialData' })
        } else {
          // 清空数据
          dispatch({
            type: 'Home/setState',
            payload: {
              ...initialState
            }
          })
        }
      })
    }
  },

}

export default model
