import Vue from './src/Vue.js'

window.vm = new Vue({
  el: '#app', // 应该支持dom
  data: {
    msg: '信息',
    html: '<h4>h4标签</h4>',
    a: {
      b: 'bbb'
    }
  },
  methods: {
    fn(...args) {
      console.log('fn 执行了')
      console.log('this', this)
      console.log('args', args)
      this.msg = '信息'
    }
  }
})
