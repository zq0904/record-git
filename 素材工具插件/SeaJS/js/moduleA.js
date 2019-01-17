// CMD规范 所有模块都通过define()函数来定义

// 1.不依赖于其他模块
// define(function(require, exports, module) {
//   return {
//     add(...args) {
//       return args.reduce((b, a) => b + a, 0)
//     }
//   }
// })
// exports 是 module.exports 的一个引用 不使用return 也可以实现导出 参数require()方法 可以在函数内部加载所需模块
// define(function(require, exports, module) {
//   exports.add = function(...args) {
//     return args.reduce((b, a) => b + a, 0)
//   }
// })
// 简写
// define({ // 导出一个对象
//   add(x, y) {
//     return x + y
//   }
// })
// define('asd') // 导出一个字符串

// 2.依赖其他模块
define(function(require, exports, module) { // require exports module 为预定义模块
  module.exports = require('math')
})