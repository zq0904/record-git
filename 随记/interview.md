# interview
## call apply bind原理 模拟实现 (主要考对this的理解)
  ```js
    // 模拟call的实现 1.调用该函数 2.改变this指向 3.传参以单个传递
    Function.prototype.myCall = function (context, ...args) {
      context = context || window
      context._fn = this
      const res = context._fn(...args)
      delete context._fn
      return res
    }
    // 模拟apply的实现 1.调用函数 2.改变this指向 3.传参数组形式
    Function.prototype.myApply = function (context, args) {
      context = context || window
      context._fn = this
      const res = context._fn(...args)
      delete context._fn
      return res
    }
    // 模拟bind的实现 1.拷贝一个函数 2.改变this指向 3.传参以单个形式
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
## js运算符的优先级
  ```js
      function Foo() {
        getName = function () { console.log(1) }
        return this
      }
      Foo.getName = function () { console.log(2) }
      Foo.prototype.getName = function () { console.log(3) }

      var getName = function () { console.log(4) }
      function getName() { console.log(5) }

      // 请写出以下输出结果：
      Foo.getName() // 静态方法 2
      getName() // 变量提升 函数提升 函数表达式覆盖 4
      Foo().getName() // 覆盖全局window.getName 调用window.getName 1
      getName() // 1
      new Foo.getName() // new无参 < 成员访问 等价于 new (Foo.getName)() 2
      new Foo().getName() // new有参 = 成员访问 从左到右以此执行 3
      new new Foo().getName() // new ((new Foo()).getName)() 3
  ```
## ['1', '2', '3'].map(parseInt) 执行结果
  ```js
    parseInt('1', 0) // radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
    parseInt('2', 1) // 基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
    parseInt('3', 2) // 基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
    结果 [1, NaN, NaN]
  ```
## 防抖debounce 节流throttle (参考)[https://github.com/zq0904/zeroer/blob/master/packages/zeroer-core/src/util/throttle.ts]
## 深度优先遍历和广度优先遍历，如何实现 (参考)[https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/9]
  ```js
      // 深度优先遍历 DFS Depth-First-Search
      const depthFirstSearch = (rootNode, resNodes = []) => {
        if (!rootNode) return resNodes
        resNodes.push(rootNode)
        for (let node of rootNode.children) {
          depthFirstSearch(node, resNodes)
        }
        return resNodes
      }

      const depthFirstSearch = node => {
        const tasks = []
        const res = []
        if (!node) return res
        tasks.push(node)
        while (tasks.length) {
          const firstNode = tasks.shift()
          res.push(firstNode)
          for (let itemNode of Array.prototype.slice.call(firstNode.children).reverse()) {
            tasks.unshift(itemNode)
          }
        }
        return res
      }
      // 广度优先遍历 BFS Breadth-First-Search
      const breadthFirstSearch = node => {
        const tasks = []
        const nodeList = []
        if (!node) return nodeList
        tasks.push(node)
        while (tasks.length) {
          const firstNode = tasks.shift()
          nodeList.push(firstNode)
          for (let itemNode of firstNode.children) { // 核心就是维护了一个先进进出的队列
            tasks.push(itemNode)
          }
        }
        return nodeList
      }
  ```
## ES5/ES6 的继承除了写法以外还有什么区别
  ```js
      function A(name) {
        this.name = name
      }
      function B(name) {
        A.call(this, name)
      }
      B.prototype = new A()
      console.log(B.prototype.__proto__ === A.prototype)
      console.log(B.__proto__ === Function.prototype)

      class Foo {
        constructor(name) {
          this.name = name
        }
      }
      class Bar extends Foo {
        constructor(name) {
          super(name)
        }
      }
      console.log(Bar.prototype.__proto__ === Foo.prototype)
      console.log(Bar.__proto__ === Foo)
      // ES5
      1.子类和父类一样，都是先由Function创建好，再实现继承的
      2.函数有函数提升
      // ES6
      1.子类是由父类创建的
      2.类在使用时必须先声明好 没有函数提升
      3.class 的所有方法（包括静态方法和实例方法）都是不可枚举的
      4.必须使用 new 调用 class
  ```
## 浏览器 事件循环
  1. javascript为什么是单线程的
    - 浏览器js的作用是操作dom 这决定了它只能单线程的 否则会带来很复杂的同步问题 比如 假定js同时有2个线程 一个线程在某个dom节点上添加内容 一个线程删除了这个节点 这时浏览器以那个线程为准
    - js是单线程的 但是js是一门异步语言 不会做无谓的等待 任务 广义上分为同步任务和异步任务 细分为宏任务和微任务
  2. 任务队列
    - 所有同步任务 都在主线程上执行 形成一个执行栈
    - 主线程之外还存在一个任务队列 只要异步任务有了运行结果 就在任务队列之中放置一个事件（callback）
    - 一旦执行栈中的所有同步任务都执行完毕，系统就会读取任务队列中（callback），于是等待结束进入执行栈开始执行
    - 主线程不断重复前3步（主线程不断从任务队列中读取事件，整个过程是循环不断的，这种运行机制称为Event Loop 事件循环）
  3. 宏任务 微任务
    - 宏任务macrotask：script（整体代码），setTimeout，setInterval，setImmediate，I/O，UI rendering
    - 微任务microtask：process.nextTick，Promise，Object.observe，MutationObserver
    - 宏任务进入主线程，执行过程中会收集微任务加入微任务队列，宏任务执行完毕后，立即执行微任务中的任务，微任务在执行过程中将再次收集宏任务，并加入宏任务队列，反复执行
    - 一轮事件循环是 执行一次宏任务和所有的微任务
    - I/O 中操作 谁先到时间先放置callback callback是先进先出的
    - 执行栈每次拿callback ”只能一个一个的拿“ 比如有2个setTimeout 那就有3轮事件循环
    ```
      // 这3个的输出顺序都一致
      1.
      setTimeout(() => console.log('setTimeout'), 0)
      Promise.resolve().then(() => console.log('Promise'))
      console.log('main')
      2.
      setTimeout(() => console.log('setTimeout'), 0)
      let startTime = Date.now()
      new Promise((resolve) => {
        while(Date.now() - startTime < 1000) {}
        resolve()
      }).then(() => console.log('Promise'))
      console.log('main')
      3.
      setTimeout(() => console.log('setTimeout'), 1000)
      Promise.resolve().then(() => console.log('Promise'))
      console.log('main')

      // setTimeout入栈 () => console.log('setTimeout')加入I/O setTimeout出栈
      // Promise.resolve().then(() => console.log('Promise'))入栈  () => console.log('Promise')加入微队列 Promise.resolve().then(() => console.log('Promise'))出栈
      // console.log('main')入栈 输出'main' console.log('main')出栈（到此一轮宏任务执行完成）

      // console.log('Promise')入栈 输出'Promise' console.log('Promise')出栈（到此一轮微任务执行完成 并且没有其他的微任务 一轮事件循环结束）

      // I/O中的() => console.log('setTimeout')到时间了 console.log('setTimeout')加入宏任务中 输出'setTimeout' （就算I/O中的任务早就到时间了 也只能被上一次的微任务所收集 加入到下次的宏任务中 从属下轮事件循环）

      4.
      setTimeout(() => console.log('setTimeout'), 0)
      Promise.resolve().then(() => {
        console.log('Promise1')
        Promise.resolve().then(() => {
          console.log('Promise2')
        })
      })
      console.log('main')
      // main 宏任务
      // Promise1 微任务
      // Promise2 微任务

      // setTimeout 宏任务
      // 一共2轮事件循环

      5.
      setTimeout(() => {
        console.log('setTimeout1')
        Promise.resolve().then(() => console.log('Promise1'))
      }, 0)
      Promise.resolve().then(() => {
        console.log('Promise2')
        setTimeout(() => console.log('setTimeout2'), 0)
      })
      console.log('main')

      // main 宏任务
      // Promise2 微任务
      // setTimeout1 宏任务
      // Promise1 微任务
      // setTimeout2 宏任务
      // 一共3轮事件循环

      6.
      // async函数 1.内部可以使用await 只会对下面的代码有影响（相当于下面的代码在.then的回调中）2.async函数无论返回什么都是promise
      async function a1() {
        console.log('1')
        await a2()
        console.log('2')
      }
      async function a2() {
        console.log('3')
      }
      console.log('4')
      setTimeout(() => console.log('5'))
      a1()
      new Promise((resolve) => {
        console.log('6')
        resolve()
      }).then(() => {
        console.log('7')
      })
      console.log('8')
      // 4 1 3 6 8 2 7 5
    ```
## NodeJS 事件循环
  nodejs启动时会初始化event loop，每一个event loop都会包含如下6个阶段（nodejs事件循环和浏览器事件循环完全不一样）
  1. timers（定时器） 此阶段执行哪些由setTimout、setInterval调度的回调
  2. I/O callback（I/O回调） 此阶段会执行几乎所有的回调 除了 close callback（关闭回调）和那些由timers与setImmediate调度的回调
  3. idle，prepare（空转） 此阶段只在内部使用
  4. poll（轮询） 检索新的I/O事件 在恰当的时候node会阻塞在这个阶段
  - 代码未设定timer
    + poll阶段 queue不为空
      event loop 将同步执行队列中的callback直到队列为空 或执行callback达到系统上线
    + poll阶段 queue为空
      - 设定setImmediate(callback) event loop将结束poll阶段进入check阶段，并执行check阶段里的队列（check阶段的队列是setImmediate设定的）
      - 没有设定setImmediate(callback) event loop将阻塞在该阶段等待callback加入队列一旦加入立即执行
  - 代码设定timer
    + poll阶段 queue为空
      - event loop将检查timers 如果有一个或多个timers时间已经到达 event loop将按循环顺序进入timers阶段 并执行timer队列
  5. check（检查） setImmediate 设置的回调会在该阶段执行
  6. close callbacks（关闭事件的回调） 如socket.on('close', ...) 此类的回调在此阶段被调用
  在事件循环的每次运行之间 nodejs会检查是否在等待异步I/O或定时器 如果没有的话就自动关闭
## readystatechange DOMContentLoaded load 事件的区别
  ```js
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
## 浏览器的渲染机制
  1.处理HTML 构建DOM树
  2.处理CSS 构建CSSOM树（css对象模型）
  3.将DOM树 与 CSSOM树 合并为一个渲染树
  4.根据渲染树来布局 计算每个节点的位置
  5.调用GPU绘制 合成图层 显示在屏幕上
## 图层
  - 一般来说可以吧普通的文档流看成一个图层，特定的属性可以生成一个新的图层。
  - 不同的图层渲染互不影响，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。
  - 图层也不能过多
  - 通过以下几个常用属性可以生成新图层
    1. 3D 变换 translate3d
    2. video、iframe 标签
    3. position: fixed
## 重绘（Repaint）和 回流（Reflow）
  - 重绘 Repaint 需要更改外观而不会影响布局的属性发生变动触发 如 color 等
  - 回流 Reflow 布局或盒模型发生改变的属性发生变动触发 如 width float 等
  - 回流必定会触发重绘 重绘不一定会触发回流
  - 如何减少重绘和回流
    1. 有大量计算或者操作属性样式时 可以借助fragment对象使操作的dom”离线“ 操作完后在添加进页面中
    2. 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 window.requestAnimationFrame（保证在下次重绘之前调用指定的回调函数）
    3. 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。如 video 标签，浏览器会自动将该节点变为图层
    4. 使用GPU硬件加速提升渲染性能 写一些动画可以硬编码 如：transform: translateZ(0) 浏览器会开启一个独立图层使用GPU进行预处理并且触发了硬件加速
## 性能
  - 服务端压缩 gzip 如nginx很简单就能开启 gzip on; gzip_min_length 1k;启用gzip压缩的最小文件大小
  - CDN （加快文件的访问速度）
  - 缓存 浏览器缓存策略分为两种 [参考](https://heyingye.github.io/2018/04/16/%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/)
    1. 强缓存，影响强缓存的字段 Expires 和 Cache-Control，缓存期间不需要请求，状态码为200，浏览器会在js和图片等文件解析执行后直接存入内存缓存（memory cache）css文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存（disk cache）
      Expires: Wed, 22 Oct 2018 08:41:00 GMT // 表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。
      Cache-control: max-age=30 // 优先级高于 Expires 表示资源会在 30 秒后过期，需要再次请求。
      （1）public：所有内容都将被缓存（客户端和代理服务器都可缓存）
      （2）private：所有内容只有客户端可以缓存，Cache-Control的默认取值
      （3）no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
      （4）no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
      （5）max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效
    2. 协商缓存，影响协商缓存的字段 Last-Modified / If-Modified-Since 和 Etag / If-None-Match，需要请求，如果缓存有效会返回304 否则200，Etag / If-None-Match优先级更高
    3. 总结：强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存 不发请求状态码200，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回304
  - HTTP/2.0 中引入了多路复用，能够让多个请求使用同一个 TCP 链接，极大的加快了网页的加载速度。并且还支持 Header 压缩，进一步的减少了请求的数据大小。（前端应该是拆成多个文件 比 单个文件 加载速度要块）
  - DNS 预解析 (DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。尤其是在手机上存在网络延迟的情况下，当页面存在大量可能会单击的外部网站链接（例如搜索引擎结果）时)
    <link rel="dns-prefetch" href="//concat.lietou-static.com">
  - 预加载
    <link rel="preload" href="style.css" as="style">
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
## 监控
  - 对于代码运行错误，通常使用 window.onerror 拦截报错信息。有些拦截不到需要单独处理
    对于跨域的script 需要在标签上添加 crossorigin属性
    对于某些浏览器可能不会显示调用栈信息，这种情况可以通过 arguments.callee.caller 来做栈递归
    对于异步代码 使用catch捕获
## 安全 [参考](https://www.jianshu.com/p/64a413ada155)
  - XSS 跨网站指令码
    场景：1. input/textarea元素输入<script>alert('xss')</script> 2.直接使用URL参数攻击https://www.baidu.com/s?wd=<script/>
    1. 比如 js向页面中添加元素 不能保证添加的元素不包含script标签等 通常的做法是做转义处理如对引号，尖括号，斜杠进行转义
    2. 只有用户明确确认的可以以标签渲染（常见的模板引擎都是这么处理的Vue React等）
    3. 对于url encodeURIComponent
    4. 将重要的cookie标记为HttpOnly 请求时就会带上cookie 但是js脚本中却不能访问这个cookie
    5. 常见的npm包 如 xss 使用白名单过滤
  - CSRF 跨站请求伪造
    场景：用户在正常网站登录会种cookie 然后在第三方网站通过script/imags/iframe的src不受同源策略影响请求会携带cookie（<iframe src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>）来伪造请求
    1. Token验证（token一般是前端封装进请求里的 不在cookie中 第三方网站一般没发伪造 就算伪造也需要经过服务端的验证）
    2. 验证Referer来判断该请求是否为第三方网站发起的，是就拦截
    3. 对cookie设置SameSite属性，以阻止cookie不随着跨域请求发送
  - 密码”加盐“
    数据库不会存储明文的密码 会对用户传递过来的信息做加盐在加密的处理 如 md5(md5(salt + password)) // 加盐并不能阻止别人盗取账号，只能确保即使数据库泄露，也不会暴露用户的真实密码
    对于暴力破解方式 一般限制尝试次数 或 使用验证码增加延时
## Vue原理
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
## Router原理
  ```js

  ```
## webpack原理
  ```js
  ```
## webpack动态import如何实现
  ```js
    1. 使用import()会单独打一个chunk，源码中使用__webpack_require__.e加载chunk
    2. 闭包变量installedChunks = { "main": 0 } 用来存储chunks
      键对应的值可能是（
        [resolve, reject, promise] chunk 已加载和正在加载
        undefined = chunk 没有加载
        null = chunk preloaded/prefetched
        Promise = chunk loading
        0 = chunk 加载完成
      ）
    3. __webpack_require__.e
      创建script标签 监听script的onerror（如果触发了onerror 或者120s都处于padding状态，则将installedChunks[chunkId] = undefined 表未加载） / onload事件（是在代码下载并执行完才会触发onload）
      appendChild到页面中加载对应的chunk的代码，chunk代码执行window["webpackJsonp"].push([chunkIds, moreModules]) push方法已经被重写过实际上是调用webpackJsonpCallback（
        1. 设置installedChunks[chunkId] = 0 表已经加载完成
        2. 将moreModules扩展进modules
        3. 在window["webpackJsonp"]中记录该chunk
        4. 将对应chunk的置为resolve
      ）
  ```
## webpack 环境 import 多次 同一个文件 会打包多次吗为什么？
  不会多次打包，因为对应的模块函数只有一个，只是在使用的地方多次调用函数
## Vue和React数据绑定对比
  ```
    数据绑定上来说，vue的特色是双向数据绑定，而在react中是单向数据绑定
  ```
