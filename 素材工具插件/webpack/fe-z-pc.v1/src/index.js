import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import store from './store' // 开启全局的严格模式 一定要放到所有组件上面
import { Provider } from 'mobx-react'
import App from './App'

// 注入插件 store 等

ReactDOM.render(
  <Provider {...store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
