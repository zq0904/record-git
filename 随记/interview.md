# interview

## 总结
### 描述： h-admin-pc重构 对 猎头管理下 正式用户 认证不通过用户 禁用登录用户 删除用户 禁用用户 模块的改版 优化了操作日志 审核记录 （技术栈 react + raect-router-dom + mobx ）
### h-admin-pc重构 自己写了一个react脚手架 实现了...功能 手写admin核心库（包含了 节流防抖 订阅和发布模式 日期格式化 queryString 等常用方法）
### 解决antd form过大的性能问题
### 多次分享 Webpack原理 Vue原理 router原理
### 优选猎头 信用分 Boos认证 h5动态分享优化 html2canvas实现长按保存图片等功能
### 非凡hunter2018 实现原生路由 html2canvas实现下载海报 封装基本图片加载Promise实现下载海报优化
### 谷露项目 使用 pastMessage 跨ifram 通信

`
1. 拥有React、Vue项目开发经验，理解MVVM开发模式，熟练掌握SPA开发流程
2. 熟练使用ES6语法，理解Promise、Async、Awai异步解决方案
3. 熟悉TypeScript
3. 理解vue双向绑定原理 router原理 webpack原理
4. 熟练使用React及其相关框架（create-react-app、react、mobx、classnames、AntD、sass）
5. 熟练使用Vue及其相关框架（vue-cli、vue、vue-router、vuex、axios、Element、sass）
6. 拥有自己写的核心库 脚手架

1. 熟练使用html css js根据ui提供的设计稿，快速搭建符合w3c标准的页面结构
2. 对三层架构、性能优化有一定理解，能够解决常见的兼容性问题，有着良好的代码编写习惯
3. 熟练使用ajax发送异步请求从后台获取json格式数据，按需动态渲染页面
5. 熟练使用基础类库及ui框架，如jquery、zepto、bootstrap、Element、AntD等
6. 熟悉常见插件及工具库，如echarts、lodash、moment、animate.css、ejs等
7. 熟练使用多种布局方案（流式布局、rem布局、flex布局、响应式布局），能够使用媒体查询做部分兼容处理
7. 熟练使用和理解jsonp跨域、doman跨域、nginx反向代理、cors等跨域访问方式，理解cookie和session机制
10. 理解JavaScript高级特性（oop、继承、原型链、闭包等）

12. 熟悉Mac开发环境及工具 如基本的linux操作 SwitchHosts、Charles、Postman、Sketch、Ps
13. 熟练使用Sourcetree + git进行代码版本管理，了解SVN
14. 熟练使用json-server mockjs等接口类测试工具模拟后台数据 Browsersync浏览器同步测试工具 tinypng压缩等工具
15. 熟悉Nodejs，Express框架，熟悉MySQL数据库
16. 熟练的使用vsocde 结合 node的--inspect-brk 进行node调试
17. 熟悉docker docker-compose

18. 个人随笔 https://github.com/zq0904/record-git/tree/master/%E9%9A%8F%E8%AE%B0
16. 拥有自己的ubuntu服务器 使用pm2做自动部署

14. 熟练使用npm、yarn、webpack，了解Gulp等构建工具，能够与后端协商设计出           规范的目录结构




工作经历
2015.4-2017.11 公司名称：长春南北科技技术有限公司     部门岗位：研发部  Web前端开发工程师
              工作描述：
              1.根据业务需求，完成前端代码编写工作，分析并给出最优的前端结构解决方案
              2.负责前端页面开发，根据UI设计师的设计稿，高度还原psd图，完成效果展示
              3.配合后端工程师一起研讨技术实现方案，实现后台数据交互
              4.理解和分析网站结构，优化架构标准，不断打磨网站的性能，并保持良好兼容
              5.与项目组内同事保持良好沟通，稳步推进项目进度，保证产品质量
              6.产品测试，撰写产品说明书，整理产品本版需求、归档
2014.7-2015.3 公司名称：长春明思软件技术有限公司     部门岗位：网络部  Web前端开发工程师
              1.负责少量平面广告设计
              2.完成静态页面布局、样式编写
              3.使用JS、Jquery实现页面动态效果和事件绑定
              4.对已上线的项目进行定期维护































# call apply bind原理 模拟实现 (主要考对this的理解)
```javascript
  Function.prototype.myCall = function (context, ...args) {
    context = context || window
    context._fn = this
    const res = context._fn(...args)
    delete context._fn
    return res
  }
  Function.prototype.myApply = function (context, args) {
    context = context || window
    context._fn = this
    const res = context._fn(...args)
    delete context._fn
    return res
  }
  Function.prototype.myBind = function (context, ...args) {
    context = context || window
    context._fn = this
    return () => {
      const res = context._fn(...args)
      delete context._fn
      return res
    }
  }
  // 使用
  const fn = function (...args) {
    console.log(this, ...args)
  }
  fn.myCall({ a: 1 }, 1)
  fn.myApply({ a: 1 }, [1])
  const fnc = fn.myBind({ a: 1 }, 1)
  fnc()
```
# readystatechange DOMContentLoaded load 事件的区别
```
  // document.readyState 这个属性是用来描述document的加载状态的 有3种值
  // loading 文档仍在加载
  // interactive 文档已完成加载，并且已对文档进行了解析，但是仍在加载子资源，例如图像，样式表和框架 DOMContentLoaded事件即将触发
  // complete 文档和所有子资源均已完成加载。load事件即将触发
  document.addEventListener('readystatechange', event => {
    console.log('readystatechange', document.readyState)
  })
  // DOMContentLoaded 事件 会在页面DOM被加载后立即触发 而无需等待资源加载完成
  window.addEventListener('DOMContentLoaded', event => console.log('DOMContentLoaded'))
  // load 事件 会在整个页面都加载完成时执行（包括样式图片加载）
```
# 浏览器的渲染机制
  1.处理HTML 构建DOM树
  2.处理CSS 构建CSSOM树（css对象模型）
  3.将DOM树 与 CSSOM树 合并为一个渲染树
  4.根据渲染树来布局 计算每个节点的位置
  5.调用GPU绘制 合成图层 显示在屏幕上
# 图层
  - 一般来说可以吧普通的文档流看成一个图层，特定的属性可以生成一个新的图层。
  - 不同的图层渲染互不影响，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。
  - 图层也不能过多
  - 通过以下几个常用属性可以生成新图层
    1. 3D 变换 translate3d
    2. video、iframe 标签
    3. position: fixed
# 重绘（Repaint）和 回流（Reflow）
  - 重绘 Repaint 需要更改外观而不会影响布局的属性发生变动触发 如 color 等
  - 回流 Reflow 布局或盒模型发生改变的属性发生变动触发 如 width float 等
  - 回流必定会触发重绘 重绘不一定会触发回流
  - 如何减少重绘和回流
    1. 有大量计算或者操作属性样式时 可以借助fragment对象使操作的dom”离线“ 操作完后在添加进页面中
    2. 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 window.requestAnimationFrame（保证在下次重绘之前调用指定的回调函数）
    3. 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。如 video 标签，浏览器会自动将该节点变为图层
    4. 使用GPU硬件加速提升渲染性能 写一些动画可以硬编码 如：transform: translateZ(0) 浏览器会开启一个独立图层使用GPU进行预处理并且触发了硬件加速
# 性能
  - 服务端压缩 gzip 如nginx很简单就能开启
  - CDN （加快文件的访问速度）
  - 缓存 浏览器缓存策略分为两种
    1. 强缓存 缓存期间不需要请求，状态码为 200，实现强缓存可以通过两种响应头实现 Expires 和 Cache-Control
      Expires: Wed, 22 Oct 2018 08:41:00 GMT // 表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。
      Cache-control: max-age=30 // 优先级高于 Expires 表示资源会在 30 秒后过期，需要再次请求。
    2. 协商缓存 需要请求，如果缓存有效会返回 304。
  - HTTP/2.0 中引入了多路复用，能够让多个请求使用同一个 TCP 链接，极大的加快了网页的加载速度。并且还支持 Header 压缩，进一步的减少了请求的数据大小。（前端应该是拆成多个文件 比 单个文件 加载速度要块）
  - DNS 预解析 (DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP)
    <link rel="dns-prefetch" href="//concat.lietou-static.com">
  - 预加载
    <link rel="preload" href="http://example.com" />
  - 预获取 浏览器空闲时间加载（通常是结合code splitting 实现 既优化了首屏的渲染速度 也优化了按需加载的速度）
    <link rel="prefetch" href="http://example.com" />
  - 图片
    1. 雪碧图 精灵图（减少请求）
    2. 懒加载（原理：在可视区外的 img src设置为站位图片 自定义属性设置真实图片资源地址 当由于滚动等进入可视区域 将真实图片地址赋值到src）
    3. 能用的渐变色等图片尽量用css替代
    4. 正确选用合适的图片格式 WebP格式能用尽量用支持压缩 透明图颜色少png8 特别小的单双图svg代替 照片jpg有损压缩
    5. 手动压缩 如 https://tinypng.com/
  - 代码
    1. css代码
      选择器 嵌套尽量少 浏览器解析是从右到左
      启动硬件加速 提升渲染性能
    2. js代码
      尽量避免 重绘 回流 内存泄漏 不用的事件变量等 及时清理
      debounce
      throttle
  - webpack优化
    1. 打包使用 production模式 所做的优化
      默认开启 tree shaking (依赖于import export 静态语法)
      scope hoisting 分析模块之间的依赖关系 (依赖于import export 静态语法)
      代码压缩
    2. code spliting 如 路由懒加载 动态导入等（基于Es6模块import export 需要配置babel）避免用户加载一些可能根本就不会使用到的资源
    3. contenthash 做缓存
    4. 合并多个js、css文件（减少请求） css从js中抽取（减少js体积） css放header js放body结尾（js文件会阻断dom加载）
    5. 小图base64内置模板（减少请求） 大图压缩（减小资源大小）
# 监控
  - 对于代码运行错误，通常使用 window.onerror 拦截报错信息。有些拦截不到需要单独处理
    对于跨域的script 需要在标签上添加 crossorigin属性
    对于某些浏览器可能不会显示调用栈信息，这种情况可以通过 arguments.callee.caller 来做栈递归
    对于异步代码 使用catch捕获
# 安全
  - XSS 跨网站指令码
    1. 比如 js向页面中添加元素 不能保证添加的元素不包含script标签等 通常的做法是做转义处理如对引号，尖括号，斜杠进行转义
    2. 只有用户明确确认的可以以标签渲染（常见的模板引擎都是这么处理的Vue React等）
    3. 常见的npm包 如 xss 使用白名单过滤
    4. CSP 设置HTTP Header Content-Security-Policy 来开启 CSP
      Content-Security-Policy: default-src ‘self’ // 只允许加载本站资源
      Content-Security-Policy: img-src https://* // 只允许加载 HTTPS 协议图片
  - CSRF 跨站请求伪造
    对 Cookie 设置 SameSite 属性 以阻止Cookie不随着跨域请求发送
    验证 Referer 来判断该请求是否为第三方网站发起的
  - 密码”加盐“
    数据库不会存储明文的密码 会对用户传递过来的信息做加盐在加密的处理 如 md5(md5(salt + password)) // 加盐并不能阻止别人盗取账号，只能确保即使数据库泄露，也不会暴露用户的真实密码
    对于暴力破解方式 一般限制尝试次数 或 使用验证码增加延时
# Vue原理
```
  核心模块
  1. Observer
    数据劫持（Object.defineProperty）
    数据中的每个key 只new了一个dep实例（闭包运用）
    当get获取值时 如果在Dep上有静态属性（当前的watcher实例）则会将watcher实例push进dep队列中
    当set设置属性时 调用dep实例的发布
  2. Compiler
    负责初始解析dom
    new Watcher() 每个指令都会new一个 如{{}} v-html等
  3. Watcher（关联Compiler 和 Observer）
    初始化会将watcher实例添加到Dep类的静态属性上 // 利用Dep的静态属性 因为是同步执行没有问题
    获取数据的值 作为老值 将触发get 将watcher实例push进dep队列中
    删除Dep类的静态属性watcher实例
    提供了一个 更新视图的回调方法
  4. Dep 事件订阅发布模型 本质就是一个队列 提供 一个添加进队列的方法（订阅） 和 一个执行队列中所有方法的方法（发布）
```
# Router原理
```

```












`