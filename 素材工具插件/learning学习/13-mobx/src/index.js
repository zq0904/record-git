import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import RootStore from './store'
import { Provider } from 'mobx-react'

// 1.mobx版本 5需要浏览器支持 ES6 Proxies 4不需要 一般都使用4
// 2.create-react-app + mobx 支持装饰器语法的配置
// npm i -D react-app-rewired customize-cra @babel/plugin-proposal-decorators 创建config-overrides.js 写入重写配置
// npm i -S mobx@4 mobx-react

ReactDOM.render(
  // Provider 通过react中的context对象将store传递给任意的子组件
  <Provider {...new RootStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
