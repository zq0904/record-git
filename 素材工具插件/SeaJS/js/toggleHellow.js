// sea.js 提供一个全局方法define(factory) 用来定义模块
define('toggleHellow', // 模块标识
  [ // 模块依赖 如果写了模块依赖 严格按照模数组的循序加载 没写 按照 require顺序加载
    '//concat.lietou-static.com/core/h5/v2/zepto/zepto.js',
    './defineObject.js',
    './defineString.js',
    'asyncload'
  ],
  function (require, exports, module) { // 模块的构造方法 和node一模一样的规则
    var $ = require('//concat.lietou-static.com/core/h5/v2/zepto/zepto.js') // require(模块标识) 同步往下执行
    var defineString = require('./defineString.js')
    var defineObject = require('./defineObject.js')
    console.log(require('asyncload'))
    // // 异步加载多个模块 在加载完成时 执行回调
    // require.async(['./c', './d'], function(c, d) {
    //   c.doSomething();
    //   d.doSomething();
    // })

    console.log(
      defineObject, // 直接 define(Object|String) 相当于 直接 模块导出的
      defineString,
      define.cmd, // 一个空对象 可用来判定当前页面是否有 CMD 模块加载器
      module.id, // 模块标识 当省略了模块标识 module.id 就是 module.uri
      module.uri, // 根据模块系统的路径解析规则得到的模块绝对路径
      module.dependencies, // 数组 表示当前模块的依赖
      require.resolve('./defineObject.js') // 返回模块 解析后的绝对路径
    )

    // 使用 exports 对外提供模块接口
    // exports 是 module.exports 的引用 整个模块最终以 module.exports 导出 exports 仅仅提供便利的挂载 不能使用 exports = {}改变引用
    exports.toggleHellow = function () {
      $('#hellow').toggle('slow')
    }
    // return {a: 1} // 直接使用return对外提供模块接口 相当于 module.exports = {a: 1}
  })
