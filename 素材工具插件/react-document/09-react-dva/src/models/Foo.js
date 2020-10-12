import { matchPath } from 'dva/router'
import { PATH_FOO } from '../router/path'

const defaultState = {
  id: '', // appid
}

export default {

  namespace: 'Foo',

  state: defaultState,

  reducers: {
    setState (state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *getInitialData (action, { all, call, put }) {
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = matchPath(pathname, { path: PATH_FOO, exact: true  })
        if (match !== null) {
          const { params: { id } } = match
          dispatch({
            type: 'setState',
            payload: {
              id
            }
          })
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
