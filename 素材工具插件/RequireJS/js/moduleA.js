// AMD模块规范 采用define()函数来定义模块

// 1.不依赖于其他模块
// define(function(require, exports, module) {
//   return {
//     add(...args) {
//       return args.reduce((b, a) => b + a, 0)
//     }
//   }
// })
// exports 是 module.exports 的一个引用 不使用return 也可以实现导出
// define(function(require, exports, module) {
//   // 参数require() 写起来来像'就近依赖' 其实在执行回调前已经下载并执行完 本质是'依赖前置'
//   exports.add = require('math').add
// })
// 简写
// define({
//   add(x, y) {
//     return x + y
//   }
// })

// 2.依赖其他模块
// 完整的写法
define(['math', 'require', 'exports', 'module'], function(math, require, exports, module) { // require exports module 为预定义模块
  return math
})
// 如果省略了第一个参数(依赖项) 默认函数的参数会加入 require exports module
// define(function(require, exports, module) {
//   module.exports = require('math')
// })