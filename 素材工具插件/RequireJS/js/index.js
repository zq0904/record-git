// 默认情况下require.js假定你所加载的模块与主程序入口index.js模块同一目录 文件名moduleA.js moduleB.js
require.config({
  urlArgs: '_=' + Date.now(), // 在加载相应模块时 动态添加查询字符串 避免缓存 也可以做版本控制 'v=1.1.0'
  baseUrl: './js', // 整体设置基准路径 会与paths地址自动拼接 默认就是js 不会拼接远程路径
  paths: {
    moduleA: 'moduleA', // 默认 (http://10.30.36.87:3000/RequireJS/js/moduleA.js)
    moduleB: './lib/moduleB', // (http://10.30.36.87:3000/RequireJS/js/lib/moduleA.js)
    jquery: ['https://cdn.bootcss.com/jquery/1.12.4/jquery.min', '1'], // 指定远程路径模块 设置为数组如果前一个加载失败会尝试向后加载(CDN回退策略)
  },
  // 加载非标准模块(不是使用define定义的)
  shim: {
    moduleB: {
      deps: [], // 设置 非标准模块 所依赖的其它模块
      exports: 'exp', // 设置 非标准模块 的一个全局变量 当做导出的模块
      init() { // 初始处理 非标准模块 的多个全局变量 当做导出的模块 这个函数中可以拿到所有的全局变量自行组装 会覆盖exports字段的模块导出
        return { a, b, exp }
      }
    }
  }
});

require(['css.min!../css/index.css']) // 加载css [模块!cssURL路径]

// AMD规范
// 全局require()函数
// 第一参数是一个数组 每一项表依赖的模块
// 第二个参数是一个回调 当所有依赖的模块都加载完成后执行回调 加载的模块以参数形式变得可用
require(['domReady', 'moduleA', 'moduleB', 'jquery'], function(domReady, moduleA, moduleB, $) {
  // domReady require.js插件 回调函数在DOM结构加载完成之后执行
  domReady(function() {
    console.log(moduleA, moduleB, $)
  })
})

// 写插件 umd方式一般兼容 CommonJS AMD
// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//   typeof define === 'function' && define.amd ? define(factory) :
//   (global.Vue = factory());
// }(this, (function () { return }))
