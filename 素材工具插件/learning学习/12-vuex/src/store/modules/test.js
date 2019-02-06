export default {
  // namespaced: true,
  state: {
    num: 0,
    msg: '信息',
    arr: [{ id: '1', text: '吃', done: true }, { id: '2', text: '玩', done: false }],
    inputValue: ''
  },
  // 模块方式 默认的 getters mutations actions 是注册在全局命名空间的
  getters: {
    getTest: state => state, // 模块化那state 很麻烦
    doneArr (state) {
      return state.arr.filter(v => v.done).length
    },
    // gettters 的传参 返回函数
    getTesxtById (state) {
      return id => state.arr.filter(v => v.id === id)[0].text
    }
  },
  mutations: {
    upDateTest (state, payload) {
      Object.assign(state, payload)
    },
    add (state, { num = 1 }) {
      state.num += num
    }
  },
  actions: {
    add ({ commit, dispatch }, payload) {
      setTimeout(() => commit('add', payload), 500)
    }
  }
}
