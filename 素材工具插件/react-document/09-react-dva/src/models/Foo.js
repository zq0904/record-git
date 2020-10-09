
export default {

  namespace: 'Foo',

  state: {},

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
