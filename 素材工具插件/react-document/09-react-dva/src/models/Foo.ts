import { matchPath } from 'dva/router'
import { PATH_FOO } from '../router/path'
import { Model, FooNamespace, FooState } from '../types'

const initialState: () => FooState = () => ({
  id: '',
})

const model: Model = {

  namespace: FooNamespace,

  state: initialState(),

  reducers: {
    setState (state: FooState, action) {
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
        const match = matchPath<{ id: string; }>(pathname, { path: PATH_FOO, exact: true })
        if (match !== null) {
          const { params: { id } } = match
          // 初始化 重新 “new”
          dispatch({
            type: 'setState',
            payload: {
              ...initialState(),
              id, // 初始化本地数据
            }
          })
          // 初始化异步数据
          dispatch({ type: 'getInitialData' })
        }
      })
    }
  },

}

export default model
