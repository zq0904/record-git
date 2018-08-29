[1, 2, 3].map(e => console.log(e))
const a = {}
let b = 1


// 安装相应的转码规则
// babel-preset-es2015 ES2015转码规则  babel-preset-react react转码规则 babel-preset-stage-0 ES7不同阶段语法提案的转码规则(0-3 共4个)
// 配置 .babelrc
// npm i -D babel-cli 本地安装命令行工具
// 配置 package.json scripts字段 "build": "babel src -s -d dist"  -s 生成映射文件 -d 指定输出目录 -o 指定输出文件 -w 每次更改文件时编译文件 --ignore忽略文件

// babel polyfill 有三种 babel-runtime babel-plugin-transfrom-runtime babel-polyfill
 
// babel-runtime 每次要转码 手动添加require('babel-runtime') 
// babel-plugin-transform-runtime 自动由工具添加require('babel-runtime') 不会污染全局api 避免编译时重复
// npm i -D babel-plugin-transform-runtime
// npm i babel-runtime // 作为生产依赖
// 在.babelrc中配置 "plugins": ["transform-runtime"]

// babel-polyfill 是通过修改全局prototype来实现API的垫片的
// Babel默认只转换新的JavaScript句法 而不转换新的API 如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象 及一些定义在全局对象上的方法(比如Object.assign)都不会转码
// npm i babel-polyfill
// webpack中配置entry: ['babel-polyfill', '...'] 或者 在入口文件 import 'babel-polyfill' 或者 require('babel-polyfill')

// 浏览器环境中使用
// npm i babel-standalone
// <script src="./node_modules/babel-standalone/babel.min.js"></script> 运行时编译 不推选
// <script type="text/babel"></script>
