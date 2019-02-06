import Vue from 'vue'
import Router from 'vue-router'

const Bar = () => import('../component/Bar')
const Foo = () => import('../component/Foo')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/bar', component: Bar },
    { path: '/foo', component: Foo }
  ]
})