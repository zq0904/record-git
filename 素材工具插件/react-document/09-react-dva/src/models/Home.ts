import { matchPath } from 'dva/router'
import { getListInfo } from '../services'
import { PATH_HOME } from '../router/path'
import { ReturnPromiseType } from '../common/ts'
import {
  Model,
  HomeNamespace,
  HomeState,
} from '../types'

const initialState: () => HomeState = () => ({
  list: [], // 列表数据
  totalCount: 0,
})

const model: Model = {

  namespace: HomeNamespace,

  state: initialState(),

  reducers: {
    setState (state: HomeState, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    * getListInfo (action, { call, put, select }) {
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

    * getInitialData (action, { all, call, put }) {
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
          // 初始化 重新 “new”
          dispatch({
            type: 'setState',
            payload: {
              ...initialState()
            }
          })
          // 初始化数据
          dispatch({ type: 'getInitialData' })
        }
      })
    }
  },

}

export default model
