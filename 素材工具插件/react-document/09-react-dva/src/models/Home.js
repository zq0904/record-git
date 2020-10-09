
export default {

  namespace: 'Home',

  state: {
    list: [], // 列表数据
  },

  reducers: {
    setStore (state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'setStore' })
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

}
