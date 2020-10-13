import { getUserInfo, getListInfo } from '../services/home'
import { matchPath } from 'dva/router'
import { PATH_HOME } from '../router/path'

const defaultState = {
  user: { // 用户信息
    userId: '',
    name: '',
    gender: 1, // 1男 0女
    level: 0, // 0 - 2 级别
    createDate: Date.now(),
  },
  list: [], // 列表数据
  totalCount: 0,
}

export default {

  namespace: 'Home',

  state: defaultState,

  // 同步 Action 处理器
  reducers: {
    setState (state, action) {
      return { ...state, ...action.payload }
    },
  },

  // 异步 Action 处理器
  // 1. select：用于获取state 减少从视图透传state
  // 2. call：执行异步函数
  // 3. put：发出一个 Action，类似于 dispatch
  // 4. all：类似于 Promise.all 并发执行 只要有一个reject 后面都不会执行
  effects: {
    *getUserInfo (action, { call, put }) {
      try {
        yield new Promise(resolve => setTimeout(resolve, 1000))
        const user = yield call(getUserInfo)
        yield put({
          type: 'setState',
          payload: { user }
        })
      } catch (err) {
        console.error(err)
      }
    },

    *getListInfo (action, { call, put, select }) {
      // const state = yield select(({ Home }) => Home)
      try {
        const { list, totalCount } = yield call(getListInfo)
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
        yield put({ type: 'getUserInfo' })
      ])
      console.timeLog('1')
    },
  },

  subscriptions: {
    // 这其实就有一个问题 我如何合理的实现一个 view消失 model就重新初始化的操作
    // 这个model被挂载时 他执行了
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = matchPath(pathname, { path: PATH_HOME, exact: true })
        if (match !== null) {
          // 初始化数据
          dispatch({ type: 'getInitialData' })
        } else {
          // 清空数据
          dispatch({
            type: 'setState',
            payload: defaultState
          })
        }
      })
    }
  },

}
