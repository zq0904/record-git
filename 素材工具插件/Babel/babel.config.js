// module.exports = { // plugins插件在presets之前执行 plugins中的每一项正序执行 presets中的每一项倒序执行
//   presets: [
//     ['@babel/env', {
//       useBuiltIns: 'usage',
//       // useBuiltIns: false, // 默认false 入口文件中引入什么就是什么 不会“变换” 例 import 'core-js' -> import 'core-js'
//       // useBuiltIns: 'entry', // 将单独import替换成多个import的形式 例 import 'core-js' -> 多个 import 'core-js/modules/...'（有什么用？1.导入的是全局）
//       // useBuiltIns: 'usage', // 根据入口文件依次查找所需polyfill自动导入所需填充 不需要在入口文件 import 'core-js'（1.实现按需 2.导入的是全局 3.包括regeneratorRuntime对async函数的支持 不需要使用@babel/plugin-transform-runtime）
//       corejs: 3, // 仅当useBuiltIns: 'entry' | 'usage'才有效 注入正确core-js导入版本 
//       // targets: {
//       //   ie: '8'
//       // },
//     }]
//   ],
//   plugins: [
//     ['@babel/plugin-transform-runtime', { corejs: 3 }] // 1.创建沙盒环境将Promise等使用别名的方式防止全局污染 2.解决regeneratorRuntime未定义的问题 3.默认 {helpers: true} 使用辅助别名“减少”(引用/代码)
//   ]
// }

// 常见的配置模式
// 1.针对项目 全部导入 >=IE9 全局暴露
// 入口文件 导入 import 'core-js'
// module.exports = {
//   presets: ['@babel/env'],
//   plugins: [
//     ['@babel/plugin-transform-runtime', { corejs: 3 }] // 解决regeneratorRuntime未定义的问题
//   ]
// }
// 2.针对项目 按需导入 >=IE9 全局暴露
// 入口文件 不导入 import 'core-js'
// module.exports = {
//   presets: [
//     ['@babel/env', {
//       useBuiltIns: 'usage',
//       corejs: 3
//     }]
//   ]
// }
// 3.针对包 按需导入 >=IE9 局部暴露（别名方式）
// 入口文件 绝对不能引入 import 'core-js'
// module.exports = {
//   presets: ['@babel/env'],
//   plugins: [
//     ['@babel/plugin-transform-runtime', { corejs: 3 }]
//   ]
// }
// 4.针对项目 IE8
// webpack.config.js  entry: ['core-js', './src/index.js']
// 入口文件 不导入 import 'core-js'
module.exports = {
  presets: ['@babel/env'],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }] // 解决regeneratorRuntime未定义的问题
  ]
}