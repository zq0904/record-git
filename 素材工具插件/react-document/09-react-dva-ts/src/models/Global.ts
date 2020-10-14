import { getUserInfo } from '../services'
import { Model } from 'dva'
import { ReturnPromiseType } from '../common/ts'
import { GlobalNamespace, GlobalState, UserGender, UserLevel } from '../types'

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

  reducers: {
    setState (state: GlobalState, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *getUserInfo (action, { call, put }) {
      try {
        const { userInfo }: ReturnPromiseType<typeof getUserInfo> = yield call(getUserInfo)
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
    }
  },

}

export default model
