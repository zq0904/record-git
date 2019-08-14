import Vue from 'vue'
import App from '@/App'
import axios from 'axios'
import '@/assets/css/base'
import def, { getName } from './method'
import 'babel-polyfill'

def()
getName()

const obj = require('./method.js') // CommonJS 模块导入
obj.getName()

require(['./method.js'], function (module) { // AMD 模块导入
  module.getName()
})

// (async () => {
//   const { data } = await axios.get('http://localhost:3000/list')
//   console.log(data)
// })()

new Vue({
  el: '#vm',
  render: h => h(App)
})


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
