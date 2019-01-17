seajs.config({
  base: './js', // 整体设置基准路径 会与alias别名自动拼接 默认就是js 不会拼接远程路径
  alias: {
    moduleA: 'moduleA',
    moduleB: './lib/moduleB',
    zepto: '//concat.lietou-static.com/core/h5/v2/zepto/zepto' // 加载远程模块
  }
})

seajs.use('./css/index.css') // 加载css (依赖seajs-css.js插件)

define(function(require, exports, module) {
  // CMD require()方式 '就近依赖' 执行回调前就已经下载模块 只有执行到require()才会执行其代码
  const moduleA = require('moduleA')
  const moduleB = require('moduleB')
  const $ = require('zepto') // 不是cmd规范 只能自己包装成cmd规范 要不就全局导入
  console.log(moduleA, moduleB, $)

  console.log( require.resolve('zepto') ) // 返回模块解析后的绝对路径

  // 如果使用require.async()只有执行到这行才会去并行下载执行模块 模块下载并执行完 执行回调 (这个方法等同于AMD的方式)
  // require.async(['moduleA', 'moduleB'], function(moduleA, moduleB) {
  //   console.log(moduleA, moduleB)
  // })
})

// 如果写CMD插件兼容
// typeof define === "function" && define.cmd
// 如果修改jQuery Vue主流兼容AMD改CMD
// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//   typeof define === 'function' && define.cmd ? define(factory) :
//   (global.Vue = factory());
// }(this, (function () { return }))