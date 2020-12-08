import { getUserInfo } from '../services'
import { ReturnPromiseType } from '../common/ts'
import {
  Model,
  State,
  GlobalNamespace,
  GlobalState,
  UserGender,
  UserLevel,
} from '../types'

const initialState: GlobalState = {
  userInfo: {
    userId: '',
    name: '',
    gender: UserGender.male,
    level: UserLevel.zero,
    createDate: Date.now(),
  },
}

const model: Model = {

  namespace: GlobalNamespace,

  state: initialState,

  // 同步 Action 处理器
  reducers: {
    setState (state: GlobalState, action) {
      return { ...state, ...action.payload }
    },
  },

  // 异步 Action 处理器
  // 1. select：用于获取state 减少从视图透传state
  // 2. call：执行异步函数
  // 3. put：发出一个 Action，类似于 dispatch
  // 4. all：类似于 Promise.all 并发执行 只要有一个reject 后面都不会执行
  effects: {
    *getUserInfo (action, { select, call, put }) {
      try {
        const state: State = yield select()
        console.log('getUserInfo -> state：', state)
        const { userInfo }: ReturnPromiseType<typeof getUserInfo> = yield call(getUserInfo, '123')
        console.log(userInfo)
        yield put({
          type: 'setState',
          payload: { userInfo }
        })
      } catch (err) {
        console.error(err)
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      // 初始请求
      dispatch({ type: 'getUserInfo' })
    }
  },

}

export default model
