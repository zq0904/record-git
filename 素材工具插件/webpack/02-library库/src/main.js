import Vue from 'vue'
import App from '@/App'
import axios from 'axios'
import '@/assets/css/base'

// E6 模块导入
import a, { numToWord } from './ref'
a()
numToWord(1)
// CommonJS 模块导入
const ref = require('./ref.js')
ref.numToWord(2)
// AMD 模块导入
require(['./ref.js'], function(Module) {
  Module.numToWord(3)
})

async function aaa() {
  const {data} = await axios.get('http://localhost:3000/list')
  console.log(data)
}
aaa()

new Vue({
  el: '#vm',
  render: h => h(App)
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
