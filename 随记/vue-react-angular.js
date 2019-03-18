Vue  // 安装 npm install vue    默认安装最新稳定版   Vue.js不支持IE8及其以下版本
特点： //2013年12月 0.6  2015年10月 1.0  2016年10月 2.0
// 核心MVVM 数据驱动视图
// 屏蔽了DOM操作 是一个高级的模板引擎 数据双向绑定 减少DOM操作
// 渐进式的,可以融入到不同的项目中
// 一般是开发 SPA 应用程序用的比较多
// 像桌面应用程序一样的 即时性、网站的可移植性和可访问性
// 还是用ajax 有着极致的用户体验 响应快 减轻服务器的压力
//
// 不利于SEO抓取 初次加载耗时相对增多

window.onhashchange 事件 // 当锚链接发生改变时执行 <a href="#/asd"></a> 初始进入页面不会执行
location.hash //获取 地址栏中 锚部分 #/asd
$.ajax 可以直接请求html页面 得到字符串 但是在chrome浏览器中被拦截 提示（http, data, chrome, chrome-extension, https.）

文本 （文本中的 {{ }} 不要谈论双向绑定 因为获取不到文本值 不像v-model=""明确的等于获取文本值）
// <h1>{{ message + '字符串'.split('').reverse().join('') }}</h1>
v-model 双向绑定
// <input type="text" v-model="message">  v-model是双向绑定的 中间不能写js语句
// <input type="checkbox" v-model="message">  v-model显示为选中和未选中的状态（即checked）
// <textarea name="" id="" cols="30" rows="10" v-model="message"></textarea>  v-model显示为文本域中的值
v-bind:src 简写 :src 单向绑定 （原有属性或自定义属性）
// <input type="text" v-bind:value="message">
// <input type="checkbox" :checked="message">
// <textarea name="" id="" cols="30" rows="10" :value="message"></textarea>
v-on:click 简写  @click 绑定事件
// <button v-on:click="message=123"></button>
// <button @click="f(index, $event)"></button> 简写  @click-"f" function (e){}  没传参 直接通过e获取事件参数  传参了 只能通过入参$event 来传递事件参数
v-if 条件渲染 v-for 循环渲染  双向绑定
// <div v-if="message" class="box"></div> message为 true div渲染 为false div不渲染 ""内部会隐式转换 "1"显示 "0"隐藏 等
// <li v-for=" (e,i) in arr">{{ e }}</li> e是数组的每一项的值  i是索引
// <li v-for=" (e,k) of o">{{ e }}</li> e是对象的值 4 5   k是健名 a,b
// <li v-for=" (e,k,i) of o">{{ e }}</li> e是对象的值 4 5   k是健名 a,b  i是索引 0,1

// 注册一个全局自定义指令 在实例化Vue之前注册 来操作dom 在模板中 使用 v-自定义名称
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时 执行函数 el就拿到了当前的dom元素 就可以使用dom操作
  inserted: function (el) {
    el.focus();
  }
});
var app = new Vue({
  el: '#div', // 指定Vue管理的模板入口 html,body 不能作为入口
  data: { // 数据 （数据驱动视图） （核心思想 观念的转变）
    message: 1,  // data中数据时响应式的 也就是 数据变化 直接影响视图
    o:{ a:4,b:5 },
    arr // 键 值 相同的简写
  },
  watch: { // 观察data中的成员arr是否改变 改变对应函数执行 arr不需在视图模板中出现！！！
    arr: {
      handler: function (val,oldVal) { // val更改后的值 oldVal更改前的值
      },
      deep: true // 深度 watcher 不光监视arr 还监视其成员变化
    }
  },
  computed: { // 计算属性 依赖数据进行缓存 动态计算属性内部成员变量发生改变时函数重新执行计算 而函数形式的模板直接调用 只要模板视图更新就会执行对应的函数
    noComplete: {
      get () { // 当该计算属性 内部变量发生变化时 执行 get方法
        return this.todoList.filter(item => !item.isCompleted).length; // 只要 this.arr 发生变化 就会被调用
      },
      set (value) { // 当赋值给计算属性的时候 调用 set方法  如 v-model="isToggleAll"
        // value 拿到设置的值
      }
    }
  },
  methods:{ // 方法 不允许methods 与 data 中成员重名 没有缓存 方法所在的视图一旦变化(不需要内部有属性变化！！！) 方法重新被调用
    f: function () {
      this.message
    },
    d () { // E6 对象方法的简写 没啥特殊属性 省略 : function
    }
  },
  components:{ // 局部组件
    appHeader:{ //html中 使用 <app-header>标签 Ctrl+E补全
      template:'<div></div>',
      data () {
        return {
          message: '信息'
        }
      }
    }
  },
  directives: { // 局部指令
      // 'focusA':{ // v-focus-a
      //   bind:function () {},
      //   update:function () {}
      // },
      'focusA': function (el, binding) { //函数简写 bind 和 update 触发 初始 和 更新
        if (binding.value) { //binding.value获取的是 指令绑定的值 v-focus-a=""里面的值
          el.focus();
        }
      }
  },
});

按键修饰符（自己查keyCode）
// @keydown.13 = "f";
修饰符别名（推荐）
// @keydown.enter = "f";
//所有的按键别名 .enter  .tab  .esc  .space  .up  .down  .left  .right  .delete (捕获“删除”和“退格”键)
template 标签 // Vue能识别 可以执行Vue的语法 浏览器不渲染的 可以做优化
// <template v-if="arr.length">
class属性的增强
// <li :class="{ completed:e.completed }"> 属性的值可以是一个对象 键: 值   值为true时 这个键作用于class类
v-for v-if 连用
// <li v-for=" (e,i) in arr_c " v-if="i/2"></li> v-for与v-if 处于一个标签中 v-for优先级高 会循环判断 你懂得！
都可以直接写 基于Vue的JS语法
// {{ message+'1' }}中
// @keyCode.center="arr.filter( e => e.completed ).length"中
// :class="{ red:status=='all' }"
// data中等成员 直接就可以用 例如message arr status 写字符串加引号 '字符串'
v-show="" //true 显示 false 隐藏 自带隐式转换 在<template>标签中使用不好使

v-text="" v-clock 解决{{message}}所带来的文本加载闪烁问题
// <p v-text="message"></p> v-text直接就能解决加载闪烁的问题 从没有值->到值的渲染
// <div id="app" v-clock>   [v-clock]{ display:none }  先通过设置css样式隐藏 加载时自动显示
v-once // v-once指令 dom节点 及其以下 都只会渲染一次
// <div v-once> <h2>{{ message }}</h2> </div>
v-html="strHTML"
// <div v-html="strHTML"></div> 将strHTML插入div strHTML中如果含有script 不会被Vue处理 Vue防止xss攻击
v-if 与 v-show 区别
// v-if="false" //条件渲染 false 直接就移除标签 不显示
// v-show="false" //通过样式 display:none 显示隐藏元素  频繁切换使用 v-show
v-pre // Vue 不处理带有 v-pre 指令的dom及其以下元素 使其按原文显示
// <div v-pre> <h1>{{ message }}</h1> </div>

表单提交时触发 同时阻止表单提交
// <form @submit.prevent="f" >

组件化
// 3大前端框架 都是组件化开发思想 组件就是对局部视图的封装 目的提高开发效率 增强可维护性
全局注册（通用组件）//一般把网页中公共部分注册为 全局组件：轮播图、tab 选项卡、分页、通用导航
Vue.component('appFooter',{ //统一驼峰命名发 或 'app-footer' 在html中 <app-footer>标签 Ctrl+E补全
  template:`<h2>尾部</h2>`
})
局部注册（子组件） //一般把网页中非通用 只适用于当前页面的注册为 局部组件
new Vue({
  el: '#app',
  data: {},
  components: {
  }
});
网页组件化的结构 简版
// new Vue({
//   el:'#app',
//   // 在根实例中 如果有 template 会把 template的渲染结果替换掉 #app
//   // 那么把组件 直接作为 template 中的标签 实现极致的组件化  <div id="app"></div>
//   template:'<appBody></appBody>',
//   components:{
//     appBody
//   }
// });

// (function () {
//   var template = ``;
//   window.appBody = {
//     template,
//     data (){
//       return {message:'asd'}
//     },
//     components: {
//       sectionUp
//     }
//   };
// })();

// (function () {
//   var template = ``;
//   window.sectionUp = {
//     template,
//     data(){
//       return {message:1}
//     }
//   }
// })();
组件的 data 必须是函数 函数内部返回一个对象!!!（因为组件是要被多次复用的 为了使每个被调用的组件不去共享同一个data只能使用函数作用域）（ new 出来的 Vue 实例是普通的对象）
组件的 template 必须只有一个根节点
// 默认 组件与组件之间是相互独立的 无法跨组件访问 父子组件也不行
// 组件是一种特殊的Vue实例 可以自己管理自己的 template 可以配置选项资源 data computed methods

Vue 没有内置任何 ajax 请求方法
// vue 1.0 时代: vue resource插件
// vue 2.0 时代: axios    安装 npm i axios   使用axios.get('./data.json').then( data => this.data = data.data.list )
// HTML5 时代 浏览器增加了一个特殊的异步请求方法：fetch （原生支持 Promise） 由于兼容性问题，一般只在移动端使用
// 结合生命钩子获取数据，渲染数据 (created 钩子是最早能拿到 data 中的数据的钩子)
生命周期
beforeCreate(){}  // 拿不到el data
created(){}  // 能拿到data 适合发送请求修改data数据 拿不到el 无法操作DOM
beforeMount(){}  // 挂载元素之前 拿不到el
mounted(){}  // 挂载渲染已完成 能拿到el
beforeUpdate(){}  // 改变前
updated(){}  // 改变后
activated(){}  // 组件激活时调用 (动态组件)
deactivated(){}  // 组件停用时调用 (动态组件)
beforeDestroy(){}  // 实例销毁之前
destroyed(){}  // 实例销毁之后调用，已经销毁了，不再管理模板了
errorCaptured(){}  // 捕获组件中发生的错误的

vue-router 路由  //安装 npm i vue-router
// 在页面中通过 <router-view></router-view> 声明路由的出口 对应的组件会替换到这个位置
// <a href="#/foo">导航到foo</a>
// <router-link to="/foo" tag="li" exact>导航到foo</router-link>
// 默认是以a标签渲染 tag="li" 强制以li标签渲染 exact 绝对匹配
var foo = { template: `<div>我是foo</div>` }; //路由组件
var router = new VueRouter({
  linkActiveClass:'active', //当点击时 添加类样式
  routes: [
  { path:'/foo', component: foo}, // /foo 全包含匹配 到 / /f /fo /foo
  {  },
  ];
});
new Vue({
  el:'#app',
  router // 在 Vue 实例中,通过选项 router 配置路由实例,从而让整个应用具有路由能力
});


json-server 模拟后台数据 // 安装 npm i -g json-server
// 在data.json路径下启动接口服务 json-server --watch data.json -p 3001
// 这个工具已经在服务端处理了跨域的问题,自带跨域能力
// 该服务默认占用 http://localhost:3000/list
// 真正的场景是需要在客户端解决跨域（通用解决方案就是代理服务器）
npm run mock 启动方式
// package.json // data.json的配置文件
// {
//   "scripts": {
//     "mock": "json-server -w data.json -p 3002"
//   }
// }
// npm run mock
// http://localhost:3002/clip  // clip接口访问地址
// http://localhost:3002/news  // news接口访问地址
模拟一张数据表 json格式
{
  "list": [{
      "id": 1,
      "name": "小明",
      "gender": true,
      "age": "25",
      "hobby": "吃"
    }]
}
// GET    /list    查询所有
// GET    /list/id 根据id查询
// POST   /list    添加  设置Body --  x-www-form-urlencoded
// DELETE /list/id 根据id 删除
// PATCH  /list/id 根据 id 修改 设置Body --  x-www-form-urlencoded

postman 发送任意请求的软件

http-server 开启服务 //安装 npm i -g http-server
// 在对应文件目录下执行,默认占用 8080 端口启动一个服务器,自动直接打开浏览器
// hs -o -p 3001  //指定端口开启
// hs -o -p 3001 -c-1  //不启用缓存开启
// hs ./ -p 3001 -c-1 // http-server 默认监测./public文件夹index.html 没有则使用./ 与 -o 冲突

browser-sync 浏览器同步测试工具 （基于Node）
npm install -g browser-sync // 全局安装
browser-sync start --server --directory --files **/*.*, *.* // 静态页面默认打开index.html 没有手输 http://localhost:3000/highcharts.html
browser-sync start --proxy http://127.0.0.1:3002/highcharts.html --files **/*.*, *.* // 动态网站 使用代理模式 查看

MVVM （数据模型可以改变视图模型(查询)   视图模型也可以改变数据模型(修改)  视图模型与视图界面是双向绑定的）
// M 模型 表意性 可重用性
// new User({ // 增加数据
//   email:;  // viewmodel视图模型 也可以改变 model数据模型
//   password:;
// }).save(function (err,data) {
// })
// User.find(function (err,data) { // 查询数据 渲染数据
//   this.data = data; // M 改变 VM
// });

// V 视图 就是html     V <-> VM (是双向绑定的)

// VM viewmodel视图模型 就是 Vue data中成员变量   V <-> VM (是双向绑定的)
// new Vue({
//   data: {}
// });

MVVM 优点
// 低耦合：V与M不直接进行交互，一个ViewModel可以绑定到多个View上。
// 可重用性：把一些视图逻辑放在一个ViewModel里面，让很多View重用这段视图逻辑。
// 独立开发:开发人员可以专注于业务逻辑和数据的开发(ViewModel),设计人员可以专注于页面设计。（数据模型的职责单一）
// 可测试：界面素来是比较难于测试的，而现在测试可以针对ViewModel来写。

webpack 打包工具 JavaScript模块打包可以在浏览器运行
// JavaScript资源打包
// css打包
// img打包
// less打包
// sass打包
// E6 转 E5 （babel）
// 开发工具 http服务器
// 代码改变，自动刷新浏览器（热更新）
// 压缩代码
全局安装（不推选） npm install -g webpack // 如果移动项目 在另一个人电脑上还需下载  webpack本版 有可能存在兼容问题
// npm un -g webpack // 全局卸载
// 为了结构清晰 源码存储到src目录中
//              打包结果存储到dist目录中
本地安装（推选）npm install --save-dev webpack 简写 npm i -D webpack
npm init -y （跳过选项直接生成 package.json）
npm i -D webpack （本地安装为开发依赖）
创建并配置 webpack.config.js
!!! 本地安装 必须配置 package.json scripts 中的 字段 才能进行打包
配置 "build": "webpack", "watch-build": "webpack --watch",
运行 npm run build
其中 start字段 直接就可以运行 npm start

webpack.config.js 配置文件
//配置文件 最终是要在node环境下执行的
const path = require('path'); //直接引入路径模块
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //热更新
module.exports = { //导出配置对象
  //会在打包的结果中提供一个垫脚片用以兼容低版本浏览器中的不支持的 API，入口文件路径
  entry: ['babel-polyfill', './src/main.js'],
  output:{
    path:path.join(__dirname,'./dist/'), //出口文件模块路径 必须为绝对路径！！！ 动态拼接绝对路径
    filename:'bundle.js' //打包结果文件名称
  },
  devtool: 'inline-source-map', //错误具体信息位置
  plugins: [
    // 该插件的所用就是把 index.html 打包到你的 bundle.js 文件所属目录，也就是说 bundle 到哪里，index.html 就到哪里
    // 同时这个也会自动在 index.html 中出入 script 引用连接，而且引用的资源名称，也取决于你的 bundle 叫什么
    // 这个插件还可以配置压缩 html 的处理
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),  //热更新
    new webpack.HotModuleReplacementPlugin()  //热更新
  ],
  devServer: {
    //直接把资源打包到项目根目录下,看不见它
    contentBase: './',  //配置 webpack-dev-server 的 www 目录
    hot: true,   //热更新
    proxy: { //当请求路径是 /api 开头的时候，服务器代理访问到 http://localhost:3000
      "/api": {
        target: "http://localhost:3000", //代理访问的 目标路径
        pathRewrite: { "^/api": "" } //不是直接把 "/api" 拼接到目标路径，而是将开头的"/api"替换为空字符串 在拼接
      }
    }
  },
  externals: {
    //配置第三方包 当 import Vue 的时候 不会把Vue打包到bundle中,而是使用全局的Vue对象
    //键是包名 值是全局导出的接口对象
    vue: 'Vue',
    'vue-router':'VueRouter',
    axios:'axios',
    lodash: '_'
  },
  module: {
    rules: [{
        test: /.css$/,  //打包css
        use: [
          'style-loader', //2.根据模块动态创建 style 节点插入到 head 中
          'css-loader'    //1.将 css 转化为 JavaScript 模块
        ]
      },
      {
        test: /.(jpg|png|gif|svg)$/, //打包图片
        use: [
          'file-loader'
        ]
      },
      {
        test: /.less$/,  //打包less
        use: [
          'style-loader', //3.根据模块生成 style 节点插入 head 中
          'css-loader',   //2.在把 css 转成 JavaScript 模块
          'less-loader'   //1.把 less 转成 css
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, //不转换 node_modules 中的文件模块
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, //高速缓存目录 加入缓存节省编译时间
            presets: ['env'],
            plugins: ['transform-runtime'] //解决代码重复问题
          }
        }
      },
      {
        test: /.vue$/, //打包.vue单文件组件
        use: [
          'vue-loader'
        ]
      }
    ]
  }
};

package.json 配置文件 （通过 npm init -y 生成）
// {
//   "name": "demo9",   根路径名
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "build": "webpack",  这个webpack是安装在项目中的（本地安装）
//                          webpack会自动读取webpack.config.js文件作为默认的配置文件
//     "watch-build": "webpack --watch", 自动编译 只要一保存就自动打包
//     "dev":"webpack-dev-server --open"  实现监视代码改变，自动打包，打包完毕自动刷新浏览器的功能
//   },
//     "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "devDependencies": {  开发依赖
//     "babel-core": "^6.26.0",
//     "babel-loader": "^7.1.2",
//     "babel-plugin-transform-runtime": "^6.23.0",
//     "babel-polyfill": "^6.26.0",
//     "babel-preset-env": "^1.6.1",
//     "css-loader": "^0.28.7",
//     "file-loader": "^1.1.5",
//     "html-webpack-plugin": "^2.30.1",
//     "less": "^2.7.3",
//     "less-loader": "^4.0.5",
//     "style-loader": "^0.19.0",
//     "vue-loader": "^13.5.0",
//     "vue-template-compiler": "^2.5.5",
//     "webpack": "^3.8.1",
//     "webpack-dev-server": "^2.9.4"
//   },
//   "dependencies": { 核心依赖 最终项目上线 真正安装发布 npm install --production 只安装 dependencies 依赖项中的包
//     "axios": "^0.17.1",
//     "babel-runtime": "^6.26.0",
//     "bootstrap": "^3.3.7",
//     "element-ui": "^2.0.5",
//     "lodash": "^4.17.4",
//     "vue": "^2.5.5",
//     "vue-router": "^3.0.1"
//   }
// }
执行打包 npm run build



webpack 不仅可以打包 JavaScript 模块，网页开发中的一切资源都可以当作模块来打包处理

Loading CSS  // 打包css
安装依赖: // npm install --save-dev style-loader css-loader

Loading Images  // 打包images
安装依赖：// npm install --save-dev file-loader

Loading Less  // 打包less
安装依赖：// npm i -D css-loader style-loader less less-loader
// 如果 css-loader 安装过了就不需要安装了

html-webpack-plugin 插件  //将index.html打包到bundle.js 自动引入script链接
安装依赖：// npm install --save-dev html-webpack-plugin

webpack-dev-server // 实现监视代码改变，自动打包，打包完毕自动刷新浏览器的功能
安装依赖：// npm i -D webpack-dev-server
// 配置 package.json scripts "dev": "webpack-dev-server --open"
启动开发模式：// npm run dev
// 解释：该工具会自动帮你打包，打包完毕只有会自动开启一个服务器，默认监听 8080 端口号，
// 同时自动打开浏览器让你访问，接下来就会自动监视代码的改变，然后自动编译，编译完毕，自动刷新浏览器。

babel-loader // 将 E6 编译成 E5 来解决兼容性问题
安装依赖：// npm install --save-dev babel-loader babel-core babel-preset-env

// 默认 babel 只转换语法 E6 Api 如 findindex等方法 可以使用 babel-polyfill
babel-polyfill 来提供低版本浏览器中的不支持 API
安装依赖：// npm i -D babel-polyfill

babel-plugin-transform-runtime // 解决babel打包代码 (使得 插入辅助代码 导致代码体积过大)
安装依赖：// npm install babel-plugin-transform-runtime --save-dev
          // npm install babel-runtime --save

Vue Loader  // 打包.vue单文件组件
安装依赖：// npm i -D vue-loader vue-template-compiler
//vue-loader 依赖 vue-template-compiler 所以安装2个

配置热更新
配置第三方包 :（jQuery、vue-router、axios、bootstrap）
// 1.下载第三方包 npm i jquery  npm i vue-router  npm i axios  npm i bootstrap
// 2.在页面中引入资源 以打包后的dits/index.html为准去写路径 或者使用CDN加载 <script src="../node_modules/jquery/dist/jquery.js"></script>
// 3.配置webpack.config.js externals:{ jquery:'jQuery' } // key为包名 value为导出的全局对象
// 4.在页面中 import $ from 'jquery'
// 5.打包测试 npm run build
// 2.在页面中引入资源<script src="node_modules/vue-router/dist/vur-router.js"></script>
// 3.配置配置文件 externals:{ vue-router: 'VueRouter' }
// 4.在 router.js 文件中加载使用
// import VueRouter from 'vue-router';   //导入
// import Bar from './components/Bar.vue';
// export default new VueRouter({ //直接导出
//   routes:[
//   {
//     path:'/bar',
//     component:Bar
//   }
//   ]
// })
// 5.在 main.js 文件中配置使用路由对象
// import Vue form 'vue';
// import App from './App.vue';
// import router from './router';
// new Vue({
//   el:'#app',
//   components:{ App },
//   template:'<App></App>',
//   router
// })
// 6.在 App.vue 中设置路由出口
// <template>
//   <div id="app">
//     <router-view></router-view>
//   </div>
// </template>
// 2.在页面中引入资源<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
启动开发模式：npm run dev  （这是平时测试用的 只有上线了才 npm run build 打包）
// VueCLi 官方开发了一个工具：vue-cli 它可以帮你快速生成一个已经配置好了 webpack 项目。
// 安装vue-cli  确保 node npm webpack 都安装了
npm install vue-cli -g // 全局安装 vue-cli  vue -V
vue init webpack 自定义项目名
// ? Project name (exprice) ---------------------项目名称
// ? Project description (A Vue.js project) ---------------------项目描述
// ? Author Datura --------------------- 项目创建者
// ? Install vue-router? (Y/n) --------------------- 是否安装Vue路由，也就是以后是spa（但页面应用需要的模块）
// ? Use ESLint to lint your code? (Y/n)  ---------------------是否启用eslint检测规则，这里个人建议选no
// ? Setup unit tests with Karma + Mocha? (Y/n) // n 一定选No
// ? Setup e2e tests with Nightwatch? (Y/n) // n 一定选No
cd zhaoqi // 进入目录
npm install // 下载依赖
npm run dev // 运行 http://localhost:8080/ 即可访问

安装常用第三方包
// npm install axios babel-polyfill babel-runtime lodash moment bootstrap@3 element-ui jquery zepto
// 配置代理
// 配置 E6 Api 转 E5 entry: ["babel-polyfill", './src/main.js'], // 打包的入口文件路径
// 配置sass npm i node-sass sass-loader -D
// 配置 npm install –D script-loader exports-loader 使用loader模块化加载 AMD 规范的模块Zeptos使其正常运行

组件细则 .vue文件是一个自定义文件类型 包含3种类型顶级语言块
// <template> 最多包含一个<template>块 内容将被提取为字符串编译 作为Vue组件的template选项
//   <div></div>
// </template>
// <script> 最多包含一个<script>块 可以使用 import export 语法 必须导出 Vue.js组件对象
//   export default {
//     data () {
//       return {

//       }
//     }
//   }
// </script>
// <style scoped > 可以包含多个<style>标签 标签含有 scoped 属性时 这个style样式只作用于当前组件元素中
// </style>
// <style> 全局 和 局部可以一起用
// </style>
//

EcmaScript6 模块规范
导入import（相当于node中的 require）
导出export（相当于node中的 module.exports）

export default {a:1, b:2}; // 导出单个成员 等价于module.exports = function(){} 只能导一次 否则报错（node中 后面的覆盖前面的）

export const a = 123; // 导出多个成员  export必须引用到内部的一个成员
export function fn () {};

const s1 = 1;   // 导出多个成员 简单固定写法
const s2 = 2;
export { s1,s2 }; // 这么写的不是导出对象 而是多值导出的一种方式 和上面完全等价

import * as xxx from './foo' // 一次性加载所有 导出的所有成员 包括default
import xxx from './foo' // 默认加载default导出的成员 没有则加载的是undefined
import {a, fn, s1, s2} from './foo' // 加载export导出的指定多个成员 需要通过结构赋值的方式来加载


E6 语法
var //定义变量 可以重复声明 不具有块级作用域 {} 的概念（因为默认挂载到window下了）
let //不允许多次声明 具有块级作用域
const //不允许多次声明 具有块级作用域 一旦定义 不可改变 声明的同时必须赋值 const 常量比 let 效率要更高
// const 定义的常量，不能重新赋值，但是引用类型(对象 数组)可以修改数据 const o = { a:1 }  o.b=2 正确
字符串的扩展
// let name = 'liuying';
let str = ` 姓名：${name} `; // 模板字符串 具有 换行 和 填坑 特性
str.includes('姓名：'); // 是否包含指定字符串 返回boolean
str.startsWith('姓'); // 是否以指定字符串开头 返回boolean
str.endsWith('姓'); // 是否以指定字符串开头 返回boolean
str.repeat(2); // 将字符串重复拼接几次 并返回该字符串
解构赋值
 let [a,b='m',c] = [1]; // 数组按照索引顺序来解构 没解构到undefined 可以设置默认值
 let {a:name,b} = {a:'zhaoqi',b:2}; //对象按照键名解构 没解构到undefined 可以设置默认值 支持别名 name 是 a 的别名
应用
// 交换变量 [a,b] = [b,a];
// function ([x,y]) {} // 函数支持解构赋值形式的传参
// function ajax({url,type='get'}) {} // 封装 默认值的使用
// let fs = require('fs'); //原来 node中导入fs模块
// let {readFile,writeFile} = require('fs'); // 导出的fs模块对象 使用 解构赋值 按需导入
函数的扩展
// function add(x = 10,y = 20) { // 支持默认值 add(,30)这种写法报错
//   return x + y;
// }
// function add(...args) { //出现在函数参数中的 ...args 是吧剩余参数整合到 真数组 中 作用 代替 arguments伪数组
//   args  // 就是使用这个集合多余参数的 数组
//   ...args  // 数组展开操作符 和 .call(args) 一回事
// }
箭头函数
(x, y) => { // => 读作 goes to 去做
  return x + y;
}
// 一个参数 ()可以省略
// 函数体只有一条语句 {}可以省略
// {}省略 不写return  {}没省略 写return 才能有返回值
// 箭头函数不能当作构造函数 不能 new
// 匿名函数（forEach find ...） 和 函数表达式 可以使用 箭头函数的写法
// let arr =[1,2,3];
// arr.forEach( (e,i) => console.log(e,i) );
// arr.findIndex( e => e==3 );
箭头函数在使用时 自动 .bind(this)
// 箭头函数内部this 取决于外部环境 也就是外层this
// 箭头函数 无法在通过 call apply bind 来改变this指向
在Vue中 methods:{ f:function () {
    this.message //这里的函数就不要使用箭头函数 这里的this就是Vue的实例对象
} }

给对象 添加属性的方式一种方式 Object.defineProperty （vue 中 computed 计算属性 底层实现 用于设计框架）
    // o = {name:'liuying'}; // 创建对象直接就添加
    // o.gender = 12; // .方式 直接添加成员属性
    // Object.defineProperty(o,'age',{ //
    //   // value:'女', // 可以直接设置属性  value 和 get 2个不能同时设置 矛盾
    //   get: function () { // 对象属性访问器 只要访问 o.age 那么这个函数就会被调用 返回的结果就作为 o.age 的值
    //     return o._age;
    //   },
    //   set: function (val) { // 对象属性设置器 只要设置 o.age = 1 就会触发该函数  参数val拿到设置的值
    //     o._age = val; // 无法在通过o.age来赋值（会造成死循环） 可以设置第三变量 也可通过_age代理 当设置时 实现监听
    //   }
    // })
    // o.age = '女'
    // console.log(o)
底层Vue 简单封装
    // function Vue(options) {
    //   const {data, computed, methods} = options;
    //   for (key in data) {
    //     this[key] = data[key] // 将data中 成员属性 映射到 vue实例中
    //   }
    //   for (key in methods) {
    //     this[key] = methods[key]
    //   }
    //   for (key in computed) {
    //     Object.defineProperty(this, key, { // 精髓
    //       get: computed[key] // 利用属性访问器
    //     });
    //   }
    // }
    // const app = new Vue({
    //   data: {
    //     message: '信息'
    //   },
    //   computed: {
    //     noComplete: function () {
    //       console.log('computed');
    //     }
    //   },
    //   methods: {
    //     add: function () {
    //       console.log('add');
    //     }
    //   }
    // });

关于在Vue中写css样式的问题
// 组件 可以有自己的样式 组件样式可以是独立作用域
// 1.可以先提前写好样式
//   先写静态页面
//   静态页面写好之后 在抽成Vue组件形式
//   组件中只需要写 HTML JS
//   CSS直接在全局引入
// 2.复杂的PC端 先写静态页面 在抽成Vue
//   简单的M端  CSS直接写在组件中

JS中的几种跨域方法 （因为浏览器的同源策略）
通过jsonp跨域
通过代理跨域
// 代理的本质是 服务器没有跨域限制 将你要请求的地址 通过服务器去请求（服务器不仅能够接受请求 也能发送给请求）
// 只有浏览器才有跨域限制 请求确实发过去了 服务器也确实响应了 但是浏览器拦截下来 不允许使用跨域数据
使用 window.name来进行跨域
//window.name的值只能是字符串的形式，这个字符串的大小最大能允许2M左右甚至更大的一个容量
使用HTML5中新引进的 window.postMessage方法来跨域传送数据
// window.postMessage(message,targetOrigin)  方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，
// 无论这个window对象是属于同源或不同源，目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。

Lodash.js：实用的工具库
_.debounce() 函数节流
// is_email:_.debounce( async function () {
//   const {data} = await axios.get(`/api/users?email=${this.fromData.email}`);
//   this.emailMessage = data[0] ? true : false;
//   return data[0]; //没有 是undefined
// },500)

函数节流本质（函数防抖原理） //闭包的运用 利用延时器500ms 再次触发清除上次延时器ID 直到确实过了500ms才执行函数
function debounce(callback,time) {
  let timerId; //闭包的运用
  return function () {
    clearTimeout(timerId); //每次清除上次延时器ID
    timerId = setTimeout(callback,time); //在生成新的延时器
  }
}

// github上 搜索好用的资源 awesome + 技术名词  如  awesome vue
// sublime 中 Preferences -> Package Settings -> HTML/CSS/JS Prettify -> Plugin Options User 添加以vue结尾文件按照 html 格式化

Angularjs

bower //安装 npm install -g bower
// bower从远程git仓库获取代码包 不是使用npm的镜像源
// bower基于Node做的一个命令行工具，专门用来管理Web包，例如jquery boostrap等
// 初始化 bower init -y
// 下载 bower install jquery --save

yarn  //安装 npm install -g yarn
// yarn是Facebook做的一个包管理工具，和npm几乎一致
// yarm使用和npm一样的镜像源,它的诞生主要是为了解决锁定包本版的问题以及npm下载慢的问题
// 初始化 yarn init -y
// 下载 yarn add jquery bootstrap
browser-sync 浏览器同步测试工具 //安装 npm install -g browser-sync
// package.json增加
// "scripts": {
//     "dev": "browser-sync start --server --files \"css/*.css\", \"*.html\", \"js/*.js\""
//   }
// 使用 yarn run dev

基本使用
// <body ng-app="MyApp" >  （使用 ng-app 指令把模块作用到管理的节点上）angular 可以直接给body加
//   <div ng-controller="FatherController" > （定义控制器）父控制器
//     <p>{{ message }}</p>
//     <input type="text" ng-model="message"> 只能修改自己及其以下作用域
//     <div ng-controller="SonController" > 控制器其实就是函数作用域 当在自己内部作用域找不到成员的时候 会进入父控制器去查找
//        <p>{{ message }}</p>
//        <input type="text" ng-model="message"> 只能修改自己作用域的及其以下
//     </div>
//   </div>
// </body>
// <script src="node_modules/angular/angular.js"></script>
// <script>
//   var MyApp = angular.module('MyApp',[]); //定义一个模块 为了解决老本版全局控制器污染的问题
//   MyApp.controller('FatherController',function ($scope) { //使用 ng-controller 指令来把控制器和视图作用起来
//     $scope.message = '父message' //控制器就是控制视图和 VideModel 的交互的一个函数
//   });                            //相当于 Vue 中的      data      和       methods
//   MyApp.controller('SonController',function ($scope) {
//     $scope.message = '子message'
//   });
// </script>


在 Angular 中数据不需要必须初始化
Vue 中视图使用的数据必须显示的初始化到 data 中
TodoMVC
  var app = angular.module('todo-app',[]); //定义一个没有依赖的模块 空数组不可省略 如果省略表示获取 todo-app 模块
  // app.controller('MainController',['$scope',function ($scope) { //因为声明了 压缩也没事
  //  $scope.message = 1
  // }])
  app.controller('MainController',[function () {
    // this.message = 1;
    Object.assign(this,{ //assign将后一个对象合并到前一个对象中 后一个对象与前一个对象重复以后者为准 写法方便
      message:1,
      title:'2',

    });
  }])
  // <section class="todoapp" ng-controller="MainController as $main">
  // <h1>{{ $main.message }}</h1>
