import dva from 'dva'
// import createBrowserHistory from 'history/createBrowserHistory' // 这种引入方式后续不再支持
import { createHashHistory } from 'history'
import ModelsGlobal from './models/Global'
import App from './App'
import './index.css'

// 1. Initialize
const app = dva({
  history: createHashHistory()
})

// 2. Plugins
// app.use({})

// 3. Model
app.model(ModelsGlobal)

// 4. Router
// dva 内置使用的是 react-router@4.x 版本
app.router(App)

// 5. Start
app.start('#root')

// 测试用
const store = app._store
store.subscribe(() => {
  console.log('最新的 state：', store.getState())
})
