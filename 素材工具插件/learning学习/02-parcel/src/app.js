import Vue from 'vue'
import App from './component/App'
import router from './router'
import './assets/css/index.css'

new Vue({
  router,
  render: h => h(App),
}).$mount('#vm')