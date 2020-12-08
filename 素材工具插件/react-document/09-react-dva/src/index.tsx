import dva from 'dva'
// import createBrowserHistory from 'history/createBrowserHistory' // 这种引入方式后续不再支持
import { createHashHistory } from 'history'
import ModelsGlobal from './models/Global'
import ModelsHome from './models/Home'
import ModelsFoo from './models/Foo'
import App from './App'

// 1. Initialize
const app = dva({
  history: createHashHistory()
})

// 2. Plugins
// app.use({})

// 3. Model dva使用的redux都是挂载在全局的（就算是动态的组件 一但对应的model加载 就挂载到全局 除非手动操作 或者卸载 不会跟随组件卸载而卸载）
// @ts-expect-error
app.model(ModelsGlobal)
// @ts-expect-error
app.model(ModelsHome)
// @ts-expect-error
app.model(ModelsFoo)

// 4. Router
// dva 内置使用的是 react-router@4.x 版本
// @ts-expect-error
app.router(App)

// 5. Start
app.start('#root')

// 测试用
// @ts-expect-error
const store = app._store
store.subscribe(() => {
  console.log('最新的 state：', store.getState())
})

// 由于dva的断层设计 - models前缀问题 对于Action ts仅部分支持
