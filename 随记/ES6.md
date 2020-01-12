# Es6
## let const
  ```javascript
  // for循环 ()里的i属于父作用域（不是全局作用域） {}内部属于子作用域（可以使用父作用域中的成员）
  for (let i = 0; i < 1; i++) {
    let i = 99 // 没有报错 说明 ()父作用域不属于 {}子作用域
    console.log(i)
  }
  console.log(i) // 报错 说明 ()父作用域不属于 全局作用域

  // 暂时性死区: 一旦在一个块级作用域 声明了let命令 它所声明变量就绑定了这个区域 任何想在之前获取值的行为都会报错
  // 暂时性死区的本质是 只要一进入当前作用域 所要使用的变量就已经存在了 但是不可获取 只有等到声明变量的那一行代码出现 才可以获取和使用该变量
  console.log(i) // var 具备变量提升 let const 不具备变量提升
  {
    i = 2 // 暂时性死区 报错
    let i = 3
  }
  var i = 1

  // 应避免在块级作用域内声明函数 如果真的需要使用函数表达式
  function f() { console.log(1) }
  {
    let f = () => { console.log(2) }
   	console.log(f()) // 2
  }
  f() // 1

  // const 声明常量 声明就应该赋值 仅保证引用不变
  // E6变量声明有6种方式 var function let const import class
  ```
## 结构赋值
  ```javascript
  let [a, b = 2, ...c] = [1, , 2, 3] // 1 2 [2, 3] 结构赋值支持默认值
  [x, y] = [y, x] // 交换变量
  import {a: b} from 'c' // 导出的对象中 按需加载 语义清晰
  const {a: b} = require('c')
  let {a: b} = c()
  ```
## 字符串扩展
  ```javascript
  for (let e of 'asd') {console.log(e)} // ES6 为字符串添加了遍历器接口 for of 直接可遍历
  let s = 'asd'
  .includes('a', 0) // 是否包含字符串 包含返回true 第2个参数表 搜索索引位置
  .startsWith('a', 0) // 是否以该字符串开头
  .endsWith('d', s.length -1) // 是否以该字符串结尾 第2个参数默认值 要检索字符串最后一位index 针对前面的字符
  .repeat(2) // 将原字符串重复2次 并返回结果
  '1'.padStart(4, '0') // '0001' 在前面尽量补全'0' 补全后长度为4 原字符串长度>=补全后长度 返回原字符串  省略第二个参数 默认以空格补全
  .padEnd(4, '1') // 'asd1' 在字符串后面补全'1' 补全后长度为4
  `
  \`输出干扰字符需转义\`
  str${1+1}`.trim() // 模板字符串 支持换行插入变量 .trim()可以去除首位2端的换行符和空白
  window.alert`123` // 标签模板 函数调用的一种形式 模板字符串作为函数的参数
  a = '1'; b = 2;
  tag = (...args) => {console.log(args)} // [['a', 'b', ''], '1', 2] // 标签模板含有变量 会将模板字符串分割 函数所接受到的参数规则 -> 分割参数数组, 其余参数, 其余参数
  tag`a${a}b${b}`
  ```
## 正则扩展
  ```javascript
  const reg = new RegExp('zz', gi) // 参数为 字符串 修饰符（flag） 等价于 /zz/i
  new RegExp(/zz/i, 'g').flags // 第一个参数为正则对象 第二个参数修饰符会覆盖
  .flags // gi 返回所有修饰符
  .source // zz 返回的正文
  /./.test('\n') // . 不匹配 /n 返回false
  /./s.test('\n') // s修饰符 . 可以匹配任何字符
  .dotAll // 用于检测 是否使用了s修饰符
  /\d+(?=%)/.exec('12%34') // 先行断言       匹配 后面是% 前面的数字
  /\d+(?!%)/.exec('12%34') // 先行否定断言   匹配 后面不是% 前面的数字
  /(?<=\$)\d+/.exec('12$34') // 后行断言     匹配 前面是$ 后面的数字
  /(?<!\$)\d+/.exec('12$34') // 后行否定断言 匹配 前面不是$ 后面的数字
  // 在原来的组匹配中加入具体名字 得到的数组中 含属性groups {y: '1999', m: '12', d: '31'}
  const {groups: {y, m, d}} = /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/.exec('1999-12-31') // 具名组匹配 结合 结构赋值
  '2018-02-01'.replace(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/, '$1/$2/$3') // 2018/02/01
  '2018-02-01'.replace(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/, '$<y>/$<m>/$<d>') // 2018/02/01 引用具名组
  ```
## 数值扩展
  ```javascript
  Number.isFinite('25') // false 判断 一个数值不是Infinity 返回true 非数值 和 Infinity 都为false
  Number.isNaN('NaN') // false 判断 是不是NaN 是返回true
  window.isFinite('25') // true 全局方法先调用Number转换一波 在进行判断
  window.isNaN('NaN') // true 全局方法先调用Number转换一波 在进行判断
  Number.parseInt() // parseInt parseFloat 移植到Number 使得语言逐渐模块化
  Number.parseFloat()
        .isInteger(2.3) // false 判断一个数值是不是整数 （由于js精度问题 需要高精度 不要使用）
        .EPSILON // 常量 表示最小精度 值为Math.pow(2, -52) 目的在于 由于精度问题 设置一个误差范围
        .MAX_SAFE_INTEGER // 常量 表示数值范围上限 值为Math.pow(2, 53) - 1
        .MIN_SAFE_INTEGER // 常量 表示数值范围上限 值为1 - Math.pow(2, 53)
  2 ** 3 ** 2 // 指数运算符 特点右结合 相当于 2 ** ( 3 ** 2 )
  let a = 3; a **= 2 // 相当于 a = a ** 2; a = a * a     => 9
  ```
## Math上新增静态方法 只能在Math上调用
  ```javascript
  Math.trunc('foo') // NaN 内部会先调用Number方法转化为数值 去除一个数的小数部分 返回整数部分 无法转换返回NaN
      .sign() // 判断一个数 是正数(+1) 负数(-1) 零(0 | -0) 非数值会调用Number转换成数值
      .sign('9') // +1
      .cbrt('27') // 9 计算一个数的立方根
      .hypot(3, '4') // 5 返回所有参数的平方和 的平方根
  ```
## 函数扩展
  ```javascript
  function(a) { // Es5函数的默认值 缺点 a为'' false等 仍然取到默认值 加判断很麻烦
    if (typeof a === 'undefinde') {
      a = a || 'default'
    }
  }
  let d = 1; // Es6 函数默认值 精简 可阅读性 惰性求值
  function def(a = d) { d += 1; console.log(a) }
  def() // 1
  def() // 2

  // 默认值和解构赋值结合使用
  function foo({ a, b = 2 } = {}) { console.log(a, b) } foo() // undefinde 2
  // 默认值的位置 应该放在尾参数 调用函数可以不传 否则需传入undefined触发默认值 null触发不了
  function bar(a = 1, b) { console.log(a, b) } bar(undefined, 2) // 1 2
  // length属性 为 函数参数默认值之前参数 的个数 ...args也不会计入
  (function(a, b = 2, c) {}).length // 1
  (function(...args) {}).length // 0
  // 默认值优先拿参数的值
  let x = 1
  function foo(x, y = x) { console.log(y) } // 2
  foo(2)

  // rest参数 ...变量名 用于获取多余参数 用来替代伪数组arguments
  function foo(...args) {
    console.log(Array.from(arguments), args) // 将伪数组转化真数组
    console.log(...args) // ...在参数中 集成多余参数 使用则为展开数组
  }
  foo(1, 2, 3)

  // 箭头函数
  () => 1 // 没有参数使用() 没有 {} 默认return
  [1, 2, 3].map(e => e + 1) // 只有一个参数 可以不加()
  () => ({ a: 1 }) // 返回一个对象或多行语句 可以使用()
  // 本质是箭头函数没有this使用外部的引用而已 在理解上可以理解为 自动.bind(this) 绑定外部环境this
  // 箭头函数 不可以当成构造函数使用 不能new (is not a constructor)
  // 箭头函数 中不存在 arguments 使用 rest参数数
  // 箭头函数 不能使用 yield 命令 不能当做Generator函数使用
  function foo() {
    return () => {
      return () => {
        console.log(this.id)
      }
    }
  }
  foo.call({id: 1}).call({id: 2}).call({id: 3}) // 1

  // 尾递归优化 例如求n的阶层
  function foo(n) {
    if (n === 1) return 1
    return foo(n - 1) * n // 复杂度 O(n) 消耗性能大
  }
  function foo(n, c = 1) { // c 为乘积结果
    if (n === 1) return c
    return foo(n - 1, c * n) // 复杂度 O(1) 消耗性能小
  }
  ```
## 数组扩展
  ```javascript
  // 任何具备 Iterator 接口的对象都可以使用 展开运算符 ... 转为数组
  [...document.querySelectorAll('div')] // [dom, dom, dom] 注jq对象不具备Iterator接口
  [...'asd'] // ['a', 'b', 'c']
  [...new Set([1, 2])] // [1, 2]

  [a, ...b] = [1, 2, 3] // 1 [2, 3] 展开运算符 配合结构赋值 拿值
  Math.max(...[1, 2, 3]) // Math.max 接受一个一个参数形式的传递 利用...展开数组
  Math.max.apply(null, [1, 2, 3]) // Es5方式
  const arr = [4, 5, 6]
  [...arr] // Es6方式复制一个数组 或者使用 Array.from(arr)
  newArr = arr.slice() // Es5方式复制一个数组
  const list = [7, 8]
  list.push(...arr) // [4, 5, 6, 7, 8] 合并数组
  [a, ...args] = [1, 2, 3] // 结合结构赋值 拿到数组的一部分 这里...args只能放到最后一位 否则报错

  // Array.from(fakeArr, e => e, this) 可以将 伪数组 或者 具备Interator的对象 转为真数组
  Array.from({0: 'a', 1: 'b', length: '2'}) // ['a', 'b']
  Array.from(new Set([1, 2])) // [1, 2]
  Array.from('asd') // ['a', 's', 'd']
  [].slice.call({0: 'a', 1: 'b', length: 2}) // Es5 伪数组转真数组
  Array.from(document.querySelectorAll('div'), e => e.nodeName) // 第2个参数 相当于map方法 如果需要第3个参数绑定this
  Array.of(1, 3) // [1, 3] 用来弥补 Array(3)只有一个参数生成 [,,] 的不足

  // 实例方法 Array.prototype.xxx
  [1, 2, 3, 4].copyWithin(1) // [1, 1, 2, 3] .copyWithin(目标起始index, 复制的起始index默认为0, 复制的结束index默认为this.length) 修改原数组
  [1, 2, 3, 4].copyWithin(0, 2, 3) // [3, 2, 3, 4]
  [1, 2, 3].find((v, i, a) => v > 1) // 2 查找满足条件的第一项并返回
  [1, 2, 3].findIndex(function(v) { return v > this.id}, {id: 1}) // 1 查找满足条件的第一项的索引并返回 都没查到返回 -1 第二个参数绑定的this
  ['a', 'b', 'c', 'd'].fill({f: 1}, 1, 3)[1].f = 2 // ['a', {f: 2}, {f: 2}, 'd'] .fill(填充的值, 填充起始位置的index默认0, 填充结束位置的index默认this.length) 填充属于浅拷贝

  // .keys() .values() .entries() 都返回遍历器对象 对 键、值、键和值
  for (let key of ['a', 'b'].keys()) { console.log(key) } // 0  1
  for (let value of ['a', 'b'].values()) { console.log(value) } // 'a'  'b'
  for (let [key, value] of ['a', 'b'].entries()) { console.log(key, value) } // 0 'a'  1 'b'
  [1, 2, 3].includes(2, 1) // true 检查值在数组当是否存在 第2个参数为检索的起始位置
  [NaN].includes(NaN) // true 可以判断出NaN
  [1, NaN, 3].indexOf(NaN) !== -1 // false Es5判断方式 不能判断出NaN
  ```
## 对象扩展
  ```javascript
  const name = '张三'
  const o = {
    name, // 对象值 及 方法的简写
    see() { console.log(`我是${this.name}`) },
    *g() { // Generator 函数的简写需加 *
      yield '下一个'
    },
    ['var' + 1]: '动态变量键值', // Es6 允许对象字面量定义时直接 使用[]动态变量作为键值
    ['fn' + 1]() {}
  }
  // Object.is() 判断2个值是否相同 类似 === 只有2个不同
  Object.is(+0, -0) // false
  Object.is(NaN, NaN) // true
  // Object,assign() 浅拷贝的融合 后者覆盖前者
  const target = { a: {b1: 1, b2: 2}, arr: [1, 2, 3] }
  const source = { a: {b2: 3, b4: 4}, arr: [2, 3] }
  Object.assign(target, source) // { a: {b2: 3, b4: 4}, arr: [2, 3] } 只在一个层次上合并 对数组而言 是我们想要的（完全替换）
  _.assign(target, source) // { a: {b2: 3, b4: 4}, arr: [2, 3] } lodash 一样
  $.extend(target, source) // { a: {b2: 3, b4: 4}, arr: [2, 3] } jq 一样
  $.extend(true, target, source) // { a: {b1: 1, b2: 3, b4: 4}, arr: [2, 3, 3] } jq 第一参数设置为true 表深度合并
  _.merge(target, source) // { a: {b1: 1, b2: 3, b4: 4}, arr: [2, 3, 3] } 深度合并 对数组按索引(key)合并 不是我们想要的
  // 应用
  class A {
    constructor(x, y) {
      Object.assign(this, {x, y}) // 简写 this.xxx = xxx
    }
  }
  Object.assign(A.prototype, { // 简写 A.prototype.xxx = xxx
    a() {},
    b() {}
  })
  Object.assign({}, {a: 1}) // 虽然是浅拷贝 但是却实现了深拷贝的等同的效果(只在一个层次上)
  class A {
    constructor(options) {
      const default = {} // 用来设置默认值
      Object.assign({}, default, options)
    }
  }

  // 遍历对象的属性
  function A() {
    this.a = 1 // 可枚举
    Object.defineProperty(this, 'b', { // 不可枚举
      value: 2,
      enumerable: false
    })
    this[Symbol('c')] = 3 // Symbol属性
  }
  A.prototype.foo = () => 1 // 原型方法
  const a = new A()
  for (let k in a) { console.log(k) } // a foo 总结 for in 会遍历自身及原型链上 可枚举的属性 不含Symbol属性
  for (let k of Object.keys(a)) { console.log(k) } // a 总结 Object.keys() 拿到自身上 可枚举的属性 不含Symbol属性
  for (let k of Object.getOwnPropertyNames(a)) { console.log(k) } // a b 总结 Object.getOwnPropertyNames() 拿到自身上 所有属性 不含Symbol属性
  for (let k of Object.getOwnPropertySymbols(a)) { console.log(k) } // Symbol(c) 总结 Object.getOwnPropertySymbols() 拿到自身上 所有Symbol属性
  for (let k of Reflect.ownKeys(a)) { console.log(k) } // a b Symbol(c) 总结 Reflect.ownKeys() 拿到自身所有属性
  // 遍历对象的键名 是有序的 1. 先遍历所有 大于等于0整数值键（数值升序） 2. 在遍历剩下的字符串键（按加入时间） 3.最后遍历Symbol键（按加入时间）
  Object.keys({ '1': '1', 0: 0, '-1': '-1', '1.1': '1.1', 'b': 'b', 'a': 'a'  }) // [0, 1, -1, 1.1, b, a]

  Object.getOwnPropertyDescriptor({a: 1}, 'a') // 获取一个对象 某个一个key的 描述对象 （如 set get 枚举等）
  {
    value: 1,
    writable: true, // 可写
    enumerable: true, // 可枚举 如果为false  for in Object.keys() JSON.stringify() Object.assign() 都会忽略该值
    configurable: true // 可配置
  }
  // for in 会遍历对象原型上的属性或方法 可以设置enumerable为false来避免
  // 如 数组的length属性、Es6的 class 中的原型方法都是不可枚举的 在实际使用中应该多使用 Object.keys() 少用for in
  Object.getOwnPropertyDescriptors([1]) // 获取一个对象 所有key的 描述对象
  {
    0: { value: 1, configurable: true, enumerable: true, writable: true },
    length: { value: 1, configurable: false, enumerable: false, writable: true }
  }

  Object.getOwnPropertyDescriptors({get a() { return 1 }}) // { a: {get: ƒ a(), set: undefined, enumerable: true, configurable: true} } 获取一个对象的所有属性的 描述对象
  Object.create({a: 1}, {foo: {value: 1}}) // {foo: 1, __proto__: {a: 1}} 第一个参数设置原型对象 第二个参数设置所有属性的 描述对象
  Object.getPrototypeOf({__proto__: {a: 1}}) // {a: 1} 获取一个对象的原型
  Object.setPrototypeOf({foo: 1}, {a: 1}) // {foo: 1, __proto__: {a: 1}} 设置一个对象的原型

  // this关键字 总是指向函数所在的当前对象 而 super 关键字 指向当前对象的原型对象
  const a = {
    foo: 1,
    getFoo() { // 使用super关键字 只能使用 方法简写才能被识别
      console.log(this.foo) // 1
      console.log(super.foo) // 2 Object.getPrototypeOf(this).foo
      super.getFoo() // 1 Object.getPrototypeOf(this).getFoo.call(this)
    },
    __proto__: {
      foo: 2,
      getFoo() {
        console.log(this.foo)
      }
    }
  }
  Object.keys({a: 1}) // ['a'] 返回不含继承 所有属性 键名
  Object.values({a: 1}) // [1] 返回不含继承 所有属性 键值
  Object.entries({a: 1}) // [['a', 1]] 返回不含继承 所有属性 键名 键值

  let {a, ...foo} = {b: 2, __proto__: {a: 1, c: 3}} // 1 {b: 2} 结构赋值可以拿到原型对象的属性 但 展开运算符拿不到原型对象的属性

  const o = {}
  Object.defineProperty(o, 'key', { // Object.defineProperty 为某个对象 的某个key 设置描述属性
    get() { return 1 },
    set(val) { console.log(val) }
    configurable: true, // 是否可以再次配置(不同的)
    enumerable: true, // 是否可枚举 for in
    value: 1, // 属性的值 不能与 set get 共存
    writable: false, // 是否可写 设置为false 写不会报错 但设置不上
  })
  o.key = 123 // 123
  o.key // 1
  Object.defineProperty(o, 'key', {
    get() { return 1 },
    set(val) { console.log(val) }
  })
  o.key = 123 // 123
  o.key // 1
  Object.defineProperties(o, { // Object.defineProperties 为某个对象 设置描述属性
    a: {
      get() { return  123 },
      set(val) { console.log(val) }
    }
  })
  ```
## Symbol
  ```javascript
  // Es6新增数据类型 现7种数据类型 String Number Boolean undefined null Object Symbol
  Symbol() // Symbol数据类型通过Symbol函数来生成 Symbol函数不能new
  Symbol('a') === Symbol('a') // false 名字的独一无二性
  Symbol('a').toString() // 转字符串
  !Symbol('a') // 转布尔

  // 对Symbol键的取值
  const o = { [Symbol('a')]: 1 }
  for (let k of Object.getOwnPropertySymbols(o)) {
    console.log(o[k]) // 1
  }
  Symbol('a') === Symbol.for('a') // false 已调用就创建Symbol值 不会登记在全局环境
  Symbol.for('a') === Symbol.for('a') // true Symbol.for('a') 先检索全局环境中是否存在'a'对应的Symbol值 不存在才会新建一个Symbol值 登记在全局环境中供下次搜索
  Symbol.keyFor(Symbol('a')) // undefined 返回一个已登记的 Symbol 类型值的key
  Symbol.keyFor(Symbol.for('a')) // 'a'
  ```
## Set是一个构造函数 用来生成Set数据结构 类似数组 其成员的值都是唯一的
  ```javascript
  new Set([1, 2, 2]) // Set(3) {1, 2} 可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数
  [...new Set([1, 2, 2])] // [1, 2] 数组去重的一种方式
  s.size // 2 返回成员总数
  .add(1) // Set(3) {1}
  .clear() // Set(0) {}
  .delete(1) // 删除成功返回true
  .has(1) // 监测是否含有 含有返回true
  .keys() // 返回键名的遍历器
  .values() // 返回键值的遍历器 默认遍历器接口 所以 for (let val of s) {}
  .entries() // 返回键值对的遍历器
  .forEach((val, key) => {}) // 这里的forEach回调函数接收到的参数 val key
  new Set([...new Set([1, 2, 2])].map(e => e)) // 间接使用数组的方法

  const a = new Set([1, 2])
  const b = new Set([2, 3])
  new Set([...a, ...b]) // 并集
  new Set([...a].filter(e => b.has(e))) // 交集

  // WeakSet() 与 Set() 区别 1.成员只能是对象 2.WeakSet中的对象都是弱引用（垃圾回收机制不考虑 WeakSet 对该对象的引用, 如果其他对象都不再引用该对象, 那么垃圾回收机制会自动回收该对象所占用的内存, 不考虑该对象还存在于 WeakSet 之中）
  const ws = new WeakSet()
  const a = {a: 1}
  ws.add(a) // 添加
  ws.delete(a) // true 删除
  ws.has(a) // false 检测是否存在
  ```
## Map是一个构造函数 用来生成Map数据结构 类似对象数据结构 key值可以是对象等
  ```javascript
  const map = new Map([['name', '张三'], ['content', '内容']]) // Map(2) {"name" => "张三", "content" => "内容"}
  const a = {}
  .set(a, 'a') // 对象作为键 添加成员
  .get(a) // 获取
  .size // 成员总数
  .has(a) // 是否存在 返回Boolean
  .clear() // 清空所有
  .delete(a) // 删除指定key对应的值
  .keys() // 返回键名的遍历器
  .values() // 返回键值的遍历器
  .entries() // 返回所有成员的遍历器 默认遍历器接口 所以 for (let [key, val] of map) {}
  .forEach((val, key) => {}) // 遍历 Map 的所有成员
  // Map转数组
  [...map.keys()] // ['name', 'content']
  [...map.values()] // ['张三', '内容']
  [...map.entries()] // [['name', '张三'], ['content', '内容']]
  [...map] // [['name', '张三'], ['content', '内容']]

  //  WeakMap() 与 Mep() 区别 1.成员只能是对象 2.WeakSet中的对象都是弱引用（垃圾回收机制不考虑 WeakSet 对该对象的引用, 如果其他对象都不再引用该对象, 那么垃圾回收机制会自动回收该对象所占用的内存, 不考虑该对象还存在于 WeakSet 之中）
  const wm = new WeakMap()
  const dom = document.querySelector('a')
  wm.set(dom, () => console.log(1)) // 设置
  wm.get(dom) // 获取
  wm.delete(dom) // 删除
  wm.has(dom) // 检测是否存在
  ```
## Proxy
  ```javascript
    // 设置目的：用于在目标对象之前设置一层“拦截” 修改某些操作的默认行为 语言层面做出修改
    const target = {a: 1} // 所要代理的目标对象
    const handler = { // 配置对象 定制相应的拦截行为
      get(...args) { console.log(args[2].a) }
    }
    const proxy = new Proxy(target, handler)
    target.a // 代理行为必须通过proxy实例进行操作
    proxy.a // [{a: 1}, 'a', proxy]

    // Proxy支持的拦截操作一共13种
    get(target, key, proxy) {} // 拦截属性的读取 proxy.a
    set(target, key, value, proxy) {} // 拦截对象属性的设置 proxy.a = 1 返回boolean值 （严格模式下必须返回true）
    apply(target, ctx, args) {} // 拦截proxy实例作为函数调用的操作 如 proxy() proxy.call() proxy.apply() target目标函数 ctx上下文对象this args函数参数数组
    has(target, key) {} // 拦截key in proxy操作 返回boolean值 （对for in无效）
    construct(target, args, newTarget) {} // 拦截proxy实例作为构造函数调用的操作 （必须返回对象） 如 new proxy()
    deleteProperty(target, key) {} // 拦截delete proxy[key]操作 返回boolean值 true表成功删除 false表不能删除
    ownKeys(target) {} // 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in
    getOwnPropertyDescriptor(target, key) {} // 拦截Object.getOwnPropertyDescriptor(proxy, key)
    defineProperty(target, key, propDesc) {} // 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)
    preventExtensions(target) {} // 拦截Object.preventExtensions(proxy)
    getPrototypeOf(target) {} // 拦截Object.getPrototypeOf(proxy)
    isExtensible(target) {} // 拦截Object.isExtensible(proxy)
    setPrototypeOf(target, proto) {} // 拦截Object.setPrototypeOf(proxy, proto)

    // 实现一个类似渲染函数的功能
    const h = new Proxy({}, {
	    get(target, key) {
        return (attr = {}, ...children) => {
          const el = document.createElement(key)
          for (let attrKey of Object.keys(attr)) {
            el.setAttribute(attrKey, attr[attrKey])
          }
          for (let child of children) {
            if (typeof child === 'string') {
              child = document.createTextNode(child)
            }
            el.appendChild(child)
          }
          return el
        }
      }
    })
    // h.div({a: 1},
    //   '文本',
    //   h.a({href: '//www.baidu.com'}, '链接'),
    //   h.ul({},
    //     h.li({}, '第一行'),
    //     h.li({}, '第二行')
    //   )
    // )
    // <div a="1">
    //   "文本"
    //   <a href="//www.baidu.com">链接</a>
    //   <ul>
    //     <li>第一行</li>
    //     <li>第二行</li>
    //   </ul>
    // </div>

    // Proxy.revocable() 静态方法
    const {proxy, revoke} = Proxy.revocable({}, {})
    proxy.foo = 123
    proxy.foo // 123
    revoke() // 取消proxy实例
    proxy.foo // TypeError: Revoked
  ```
## Reflect
  ```javascript
    // 设计目的：
    // 将Object对象的一些明显属于语言内部的方法放到Reflect对象上（如Object.defineProperty）未来的新方法将只部署在Reflect对象上
    // 修改某些Object方法的返回结果，让其变得更为合理（如Object.defineProperty在无法定义属性时会抛出错误 而Reflect.defineProperty会返回false）
    // 让Object操作都变成函数行为 如key in obj可以通过Reflect.has(obj, key)
    // Reflect的方法与Proxy的方法一一对应 使得Proxy对象可以方便地调用对应的Reflect方法 完成修改行为

    // 静态方法
    Reflect.get(target, key, receiver) // 获取target[key] 没有返回undefinde (如果target[key]有getter那么其this绑定为receiver)
    Reflect.set(target, key, value, receiver) // 设置target[key] = val (如果target[key]有setter那么其this绑定为receiver)
    Reflect.has(target, key) // 判断key是否为target的键 对应key in obj 返回boolean
    Reflect.deleteProperty(target, key) // 删除target[key] 对应delete target[key] 返回boolean表是否删除成功
    Reflect.construct(target, args) // 提供了一种不使用new 来调用构造函数的方法 args为数组每一项为调用构造函数的参数
    Reflect.getPrototypeOf(target) // 获取一个对象的__proto__原型 对应Object.getPrototypeOf(obj)
    Reflect.setPrototypeOf(target, prototype) // 设置一个对象额原型 对应Object.setPrototypeOf(obj, newProto)
    Reflect.apply(target, thisArg, args) // 等同于Function.prototype.apply.call(func, thisArg, args)
    Reflect.ownKeys(target) // 对象的所有属性
    Reflect.defineProperty(target, name, desc) // 等同于Object.defineProperty
    Reflect.isExtensible(target) // 等同于Object.isExtensible 返回boolean 表对象是否可扩展
    Reflect.preventExtensions(target) // 等同于Object.preventExtensions方法 用于让一个对象变为不可扩展 返回boolean 表是否操作成功
    Reflect.getOwnPropertyDescriptor(target, name) // 等同于Object.getOwnPropertyDescriptor
  ```
## Promise 对象
  ```javascript
  // Promise对象的状态 3种状态 pending 进行中 fulfilled 已成功 rejected 已失败
  // Promise的状态改变 只会由 pending -> fulfilled 或者 pending -> rejected 一旦改变 状态就凝固了 一直保持着这个结果
  new Promise((resolve, reject) => {
    if (/* 异步操作成功 */){
      resolve(value) // 1.将Promise对象的状态从未完成->成功 2.将异步操作的结果作为参数传递出去
    } else {
      reject(error) // 1.将Promise对象的状态从未完成->失败 2.将异步操作报出的错误作为参数传递出去
    }
  }).then((value => { // 成功后的回调
  }, error => { // 失败后的回调
  })
  // 执行顺序
  new Promise((resolve, reject) => {
    console.log('1. new Promise 新建实例后 立即执行')
    resolve()
  }).then(() => {
    console.log('3. then方法的回调 会在当前脚本所有同步任务执行完才会执行')
  })
  console.log('2. 同步任务')
  // 封装异步加载图片
  function asyncLoad(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('error url'))
      img.src = url
    })
  }
  // 调用resolve 或者 reject 不会终止后续同步代码的执行
  // 直接调用resolve reject是在本轮事件循环末尾执行 总是晚于本轮的同步任务 更好的方式 return resolve()
  new Promise((resolve, reject) => {
    resolve(1)
    console.log(2)
  }).then(value => console.log(value)) // 2 1

  // Promise 原型方法
  // 1. Promise.prototype.then()
  asyncLoad('https://timgsa.baidu.com')
  .then(() => console.log('success'), () => console.log('error')) // 第二个回调 不会捕获 当前.then中第一个回调的错误 (所以说一般不要指定.then的第二个参数 而总是使用.catch)

  // 2. Promise.prototype.catch() 是 .then(null, rejection) 的别名
  new Promise((resolve, reject) => reject(new Error('报错了'))).catch(err => err) // 经过.catch promise的状态变更为resolve

  asyncLoad('https://timgsa.baidu.com')
  .then(() => console.log('success'))
  .catch(() => console.log('error')) // .catch能捕获asyncLoad中 及 任何一个在.catch之前的.then中的 错误
  // .catch别名写法
  asyncLoad('https://timgsa.baidu.com')
  .then(() => console.log('success'))
  .then(null, (err) => console.log(123))

  // .then .catch 返回 非promise实例 仍使用之前的promise
  // PromiseStatus为之前的promise的状态 PromiseValue为上一个.then .catch返回的值
  new Promise((resolve, reject) => resolve(1))
  .then(val => { console.log(val); return 2; })
  .then(val => { console.log(val); return 3; })
  // Promise {<resolved>: 3}
  // __proto__: Promise
  // [[PromiseStatus]]: "resolved"
  // [[PromiseValue]]: 3

  // .then .catch 返回 promise实例 后续直接使用新的promise实例
  // PromiseStatus为新promise的状态 PromiseValue为新promise传递出来的值
  new Promise((resolve, reject) => resolve(1))
  .then(val => { console.log(val); return new Promise((resolve, reject) => reject(2)); })
  .then(val => { console.log(val); return 3; })
  // Promise {<rejected>: 1}
  // __proto__: Promise
  // [[PromiseStatus]]: "rejected"
  // [[PromiseValue]]: 2

  // 3. Promise.prototype.finally() 不管promise实例的状态为什么都会执行
  new Promise((resolve, reject) => resolve(1))
  .then(val => { console.log(val); return new Promise((resolve, reject) => reject(2)); }) // 1
  .finally(val => { console.log(val); return 3; }) // undefined 回调不接受任何参数 在这里操作应该与promise实例状态无关
  // Promise {<rejected>: 2}   .finally的返回值不会影响prosime 而总是返回原值
  // 底层实现
  Promise.prototype.finally = function (callback) {
    let P = this.constructor
    return this.then(
      val => P.resolve(callback()).then(() => val), // 而总是返回原值 的原因
      err => P.resolve(callback()).then(() => throw err)
    );
  }

  // Promise 静态方法
  // 1.Promise.all() 接受一个数组作为参数 数组中的每项均为promise实例
  const arr = ['1.jpg', '2.jpg', '3.jpg']
  const loadImg = url => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
    img.src = url
  });
  Promise.all(arr.map(v => loadImg(v)))
  .then(list => console.log(list)) // 只有数组中所有promise实例的状态都变为resolve才会执行 list为数组 每一项为每个promise实例的返回值
  .catch(err => console.log(err)) // 只要有一个promise实例的状态为reject 就会执行

  const p1 = new Promise((resolve, reject) => resolve(1))
  const p2 = new Promise((resolve, reject) => reject(new Error('报错了'))).catch(err => err) // p2 有自己的 .catch 发生错误先调用自己的.catch 状态变更为resolve
  Promise.all([p1, p2]).then(list => console.log(list)).catch(err => console.log(err)) // 2个都为resolve 执行then
  // [1, Error: 报错了]

  // 2.Promise.race() 接受一个数组作为参数 数组中的每项为promise实例 只要其中一个promise实例状态发生改变就会去执行对应的方法
  Promise.race([fetch('/asd'), new Promise((resolve, reject) => setTimeout(() => reject(), 5000))])
  .then(console.log) // 5000ms内 fetch请求成功或者失败 状态都变为resolve 执行.then方法
  .catch(console.error) // 5000ms后 fetch仍处于请求状态 后一个promise实例状态变更为reject 执行.catch方法

  // 3.Promise.resolve() 将参数转为Promise对象 这个promise的状态一般为resolve
  Promise.resolve('foo') // Promise {<resolved>: foo} 等价于 new Promise(resolve => resolve('foo'))
  Promise.resolve(new Promise(resolve => resolve(1))) // Promise {<resolve>: 1} 参数（也是resolve中的参数）如果为promise实例 则原封不动的返回这个 promise实例
  Promise.resolve({ then(resolve, reject) { reject(5) } }) // Promise {<reject>: 5} 参数（也是resolve中的参数）如果为一个具备then方法的对象 则将这个对象转化为promise对象 并调用then方法

  // 4.Promise.reject() 将参数转为 状态为reject的 Promise对象
  Promise.reject(new Promise((resolve, reject) => resolve(1))) // Promise {<rejected>: Promise} 无论参数为什么都仅作为promise的值
  ```
## Iterator 和 for of 循环
  ```javascript
  // iterator 遍历器对象本质上，就是一个指针对象
  // Es6规定 默认的 Iterator 接口部署在数据结构的Symbol.iterator属性
  // 原生具备 Iterator 接口的数据结构如下 Array Set Map String 函数的arguments对象 NodeList对象
  let arr = [1, 2];
  let it  er = arr[Symbol.iterator]();
  iter.next() // {value: 1, done: false}
  iter.next() // {value: 2, done: false}
  iter.next() // {value: undefined, done: true}
  for (let v of [1, 2]) { console.log(v) }
  for (let v of document.querySelectorAll('a')) { console.log(v) }

  // 默认调用Iterator接口的场合
  [a, ...b] = [1, 2, 3] // 解构赋值
  [...'asd'] // 扩展运算符
  let g = function* () { // yield* 后面跟的是一个可遍历的结构 它会调用该结构的遍历器接口
    yield 1;
    yield* [2, 3];
    yield 4;
  }
  let iter = g()
  iter.next() // { value: 1, done: false }
  iter.next() // { value: 2, done: false }
  iter.next() // { value: 3, done: false }
  iter.next() // { value: 4, done: false }
  iter.next() // { value: undefined, done: true }
  for...of Array.from() Promise.all() // 等其他场合也会调用

  // 指针结构
  class O {
    constructor(v) {
      this.v = v
      this.next = null // 指针 指向下一个对象
    }
    [Symbol.iterator]() {
      let that = this
      return {
        next() {
          if (that) {
            const v = that.v // 拿到当期指针所指对象的值
            that = that.next // 指针移动 指向下一个对象
            return { value: v, done: false }
          } else {
            return { value: undefined, done: true }
          }
        }
        return() {
          console.log('出错 或 有break语句 将会执行')
          return { value: undefined, done: true }
        }
        throw() { }
      }
    }
  }
  let o1 = new O(1)
  let o2 = new O(2)
  let o3 = new O(3)
  o1.next = o2
  o2.next = o3
  for (let v of o1) {
    if (v > 2) break; // break语句可以跳出for of
    console.log(v) // 1 2 '出错 或 有break语句 将会执行'
  }

  // 使用Generator函数 实现 Iterator接口
  let o = {
    [Symbol.iterator]: function* () { // Generator函数 默认返回的迭代器对象 正好具备next方法 而next方法的返回值也是{value,done}这种形式的
      yield 1;
      yield 2;
      yield 3;
    }
  }
  for (let v of o) { console.log(v) } // 1 2 3

  // for of 遍历 默认使用Iterator接口 Array Set Map 各别伪数组（arguments, NodeList） Generator对象 字符串
  // 对象不具备Iterator接口 不能直接使用for of遍历 而Object.entries等返回遍历器对象
  for (let v of [1, 2, 3]) { console.log(v) } // 1 2 3
  for (let v of new Set([1, 2, 2])) { console.log(v) } // 1 2
  for (let [key, val] of new Map([['a', 1], ['b', 2]])) { console.log(key, val) } // a 1   b 2
  for (let [key, val] of Object.entries({a: 1, b: 2})) { console.log(key, val) } // a 1   b 2 entries() keys() values() 都返回遍历器对象
  for (let [key, val] of [1, 2].entries()) { console.log(key, val) } // 0 1   1 2
  for (let v of document.querySelectorAll('a')) { console.log(v) }
  for await (const v of [promise, promise]) console.log(v) // 等价于 for (const v of [promise, promise]) console.log(await v)
  ```
## Generator 函数
  ```javascript
  // Generator函数是一个状态机 封装了多个内部状态 还是一个遍历器对象 生成函数 返回遍历器对象
  // Generator.prototype.next() Generator函数 返回的 遍历器对象 next方法 可以恢复执行 将上一个yield表达式替换为 next方法中的参数
  function* g() {
    yield 1; // 遇到 yield 暂停执行后面的操作
    return 2;
  }
  let i = g() // 调用Generator函数 返回一个遍历器对象 代表Generator函数的 内部指针
  i.next() // {value: 1, done: false} 调用next恢复执行
  i.next() // {value: 2, done: true} value表示当前的内部状态的值 是yield表达式后面的值 或者 return语句后面表达式的值 （执行到return done就为true）
  i.next() // {value: undefined, done: true} done表示是否遍历结束

  function* g() { console.log('执行了') } // 调用一个Generator函数 即便没有yield也不会立执行 必须调用next()方法
  let i = g()
  setTimeout(() => i.next(), 2000)
  function* g() {
    console.log(1 + (yield 2)) // yield在一个表达式中 必须放到()中
  }

  // yield表达式本身没有返回值 或者说总是返回undefined next方法可以带一个参数 该参数就会被当作 (!!! 上一个 !!!) yield表达式的返回值
  function* foo() {
    yield yield 1
  }
  let f = foo()
  f.next() // {value: 1, done: false}
  f.next(3) // {value: 3, done: false} 上一个 yield 1 被替换为 3
  f.next(3) // {value: undefined, done: true}
  function* foo(x) {
    var y = 3 * (yield (x + 1))
    var z = yield (y / 3)
    return (x + y + z)
  }
  let f = foo()
  f.next() // {value: 2, done: false}
  f.next(2) // {value: 2, done: false}
  f.next(3) // {value: 10, done: true}
  f.next() // {value: undefined, done: true}

  // Generator函数 返回的遍历器对象 用于 使用遍历器对象接口的操作
  function* foo() {
    yield 1
    yield 2
    return 3 // {value: 3, done: true} done为true 会导致for of循环终止
    yield 4
  }
  for (let v of foo()) { console.log(v) } // 1 2
  [...foo()] // [1, 2]
  let [x, y] = numbers() // x 1 y 2

  // 2.Generator.prototype.throw() Generator函数 返回的 遍历器对象 throw方法 可以在函数体外抛出错误 在Generator函数体内捕获
  var g = function* () {
    try {
      yield 1
    } catch (err) {
      console.log('内部捕获', err)
    }
  }
  var i = g()
  i.next() // 必须执行一次next方法 .throw 才能被内部捕获到
  try {
    i.throw('a') // 内部捕获 a
    i.throw('b') // 外部捕获 b
  } catch (err) {
    console.log('外部捕获', err)
  }

  // 3.Generator.prototype.return() Generator函数 返回的 遍历器对象 return方法 可以返回给定值 并结束Generator函数
  var g = function* () {
    yield 1
    yield 2
    yield 3
  }
  var i = g()
  i.next()        // { value: 1, done: false }
  i.return('foo') // { value: 'foo', done: true } 就好像直接在 yield 1 下一行直接添加 return 'foo'
  i.next()        // { value: undefined, done: true }

  // 总结 .next() .throw() .return() 都是让 Generator 函数 恢复执行 并替换上一个yield表达式
  var g = function* () {
    try {
      var n = yield 1
      console.log(n)
      var e = yield 2
      console.log(e)
    } catch (err) {
      console.log('内部错误', err)
    }
    var r = yield 3
    console.log(r)
  }
  var i = g()
  i.next()       //             {value: 1, done: false}
  i.next('foo')  // foo         {value: 2, done: false}         将上一个yield表达式替换为 'foo'
  i.throw('err') // 内部错误 err {value: 3, done: false}         将上一个yield表达式替换为 throw('err')
  i.return('1')  //             {value: "1", done: true}        将上一个yield表达式替换为 return '1'
  i.next()       //             {value: undefined, done: true}

  // yield* 表达式
  function* foo() { yield 'foo' }
  function* bar() { yield 'bar'; yield foo(); }
  function* flag() { yield 'flag'; yield* foo(); }
  等价于 function* flag() { yield 'flag'; for (let v of foo()) { yield v } }
  等价于 function* flag() { yield 'flag'; yield 'foo'  }
  var i = bar()
  i.next() // {value: "bar", done: false}
  i.next() // {value: foo, done: false}
  var i = flag()
  i.next() // {value: "flag", done: false}
  i.next() // {value: "foo", done: false}

  // yield* 遍历器对象  可以看成是 for (let v of 遍历器对象) { yield v } 的一种简写
  var g = function* () { yield* ['1', '2'] }
  var i = g()
  i.next() // {value: '1', done: false}
  i.next() // {value: '2', done: true}

  // yield* Generator函数有return 则会返回数据
  function* foo() {
    yield 2;
    return 'foo'
  }
  function* bar() {
    yield 1;
    var v = yield* foo(); // 'foo'
    console.log(v)
  }
  var i = bar()
  i.next() // {value: 1, done: false}
  i.next() // {value: 2, done: false}
  i.next() // foo {value: undefined, done: true}

  // 对象属性的 Generator 函数写法
  var o = {
    g1: function* () {},
    * g2() {} // 简写方式
  }
  ```
## Generator 函数的异步应用 和 Generator自动流程管理的实现
  ```javascript
  // JavaScript 语言的 Thunk函数
  // 目的是将 多参数函数 替换成一个只接受回调函数的单参数函数 （仅仅是写法形式上的变化 但会带来方便的递归）
  // 最终目的 方便递归 配合Generator函数自执行
  // 例如node fs模块读取文件 改写成Thunk函数
  fs.readFile(fileName, callback)
  var readFileThunk = function(fileName) {
    return function(fileName) {
      return fs.readFile(fileName, callback)
    }
  }
  readFileThunk(fileName)(callback)

  // 通用Thunk函数转换器
  const Thunk = function(fn) {
    return function(...args) {
      return function(callback) {
        fn.call(this, ...args, callback)
      }
    }
  }
  Thunk(fs.readFile)(fileName)(callback)

  // Thunk函数 用于 Generator函数的 自动流程管理
  function run(g) {
    var i = g()
    function callback(err, data) {
      var result = i.next(data)
      if (result.done) return
      result.value(callback) // Thunk(fs.readFile)(fileName)(callback)
    }
    callback()
  }
  function* g() {
    yield Thunk(fs.readFile)(fileName)
  }
  run(g)

  // Promise 用于 Generator函数的 自动流程管理
  function PreadFile (fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) return reject(err)
        console.log(data)
        resolve(data)
      })
    })
  }
  function run(g) {
    var i = g()
    function callback(data) {
      var result = i.next(data)
      if (result.done) return
      result.value.then(callback) // promise.then()
    }
    callback()
  }
  function* g() {
    yield PreadFile('1.txt')
    yield PreadFile('2.txt')
    yield PreadFile('3.txt')
  }
  run(g)
  ```
## async 函数
  ```javascript
  // async函数 对比 Generator函数
  // 1.内置执行器 async函数 就像是 Generator函数 + co模块(自执行器)
  // 2.更好的语义 async/await 替换原来的 */yield
  // 3.更广的适用性 co模块约定 yield命令后面只能是 Thunk函数或 Promise实例对象 而async函数的await命令后面 可以是 Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
  // 4.返回值是 Promise  而 Generator函数返回遍历器接口对象(指针)
  // async函数 可看成是 把多个异步操作包装成一个Promised对象(返回Promise) 内部的await命令就是.then的语法糖

  // async函数的声明
  async function() {}
  async () => {}
  var fn = async function() {}
  var fn = async () => {}
  { async foo() {} }
  { bar: async () => {} }

  // async函数无论return什么都默认“包装”成promise实例对象
  (async () => 1)() // Promise {<resolved>: 1}

  // async函数内部抛出错误 会导致返回的Promise实例状态为reject
  (async () => {
    throw new Error('出错了')
  })()              // Promise {<rejected>: Error: 出错了}
    .then(() => console.log('成功执行'))
    .catch((err) => console.log(err))

  // async函数 await 后面的 Promise实例对象如果状态变为reject 整个async函数都会终止执行 相当于直接返回了这个promise实例
  (async () => {
    var err = await Promise.reject('错误')
    console.log(err) // 终止执行 不会执行到这
  })()             // Promise {<rejected>: "错误"}
    .then(() => console.log('成功执行'))
    .catch((err) => console.log(err)) // 错误

  // 错误处理 优先顺序
  (async () => {
    try {
      await Promise.reject('错误').catch((err) => console.log(err)) // 1
    } catch (err) { console.log(err) } // 2
  })()
  .catch((err) => console.log(err)) // 3

  // 异步操作bar依赖foo 只能 继发 (在foo异步操作完成之后 再去bar异步操作)
  (async () => {
    await foo()
    await bar()
  })()

  // 异步操作bar和foo没有依赖关系 并发 (同时执行 减少程序的执行时间)
  (async () => {
    const list = await Promise.all([foo(), bar()])
  })()

  // 继发 常见错误写法
  const arr = [foo, bar] // foo是函数名 调用返回Promisr实例对象
  (() => {
    arr.forEach(async v => { // foo bar 实际上是并发操作 而且console.log(123)同步任务先执行
      await v()
    })
    console.log(123)
  })()
  // 等价于
  (async () => {
    await foo()
  })()
  (async () => {
    await bar()
  })()
  console.log(123)
  ```
## Class 基本语法
  ```javascript
    // 构造函数方式 生成实例对象 （首先是这种写法和C++和Java差异很大 而且构造函数能直接调用等问题）
    function P(x) {
      this.x = x // 添加实例属性
    }
    P.prototype.a = function() { console.log('原型方法 a') }
    var p = new P(1)

    // class方式 生成实例对象
    class P { // 类不存在变量提升 不同于构造函数 这样设计的目的是 类的继承保证顺序 （子类在父类之后）
      // 类和模块的内部 默认就是严格模式 不需要使用use strict指定运行模式
      constructor(x) { // 类的默认方法 new时会自动调用 如果没写constructor方法 程序会自动添加
        this.x = x
        // return this // constructor方法默认返回 this
      }
      a() { console.log('原型方法 a') }
    }
    var p = new P(1) // 类必须使用 new来调用 而 构造函数单独调用 相对更“安全”
    typeof P // "function" 类本质是函数
    P === P.prototype.constructor // true 类本身指向 自身的 原型构造方法
    for (let key in p) { console.log(key) } // x  class的原型方法都是不可枚举的 而 构造函数上的原型方法是可枚举的 相对更“安全”
    p.hasOwnProperty('x') // true 判断p是否含有x属性 原型链上的属性不会被检测
    Object.getPrototypeOf(p) === p.__proto__ // true 获取一个对象的原型

    // Class表达式
    const Point = class P {
      constructor() {
        console.log(P) // 在class内部 可以获取 P类名
      }
    }
    console.log(Point.name) // P name属性总是返回紧跟在class关键字后面的名字
    console.log(P) // P is not defined 在class外部 不能获取 P类名
    new Point() // 只能new Point
    const Point = class {} // 如果内部没有用到P类名的话 直接匿名class 表达式
    const p = new class { // 立执行class
      constructor(...args) {
        console.log(...args)
      }
    }('张三')

    // this指向 单独使用类的方法this会指向方法所在的运行环境
    class A {
      // constructor() { this.b = this.b.bind(this) } // 简单的解决办法
      a() { return this.b }
      b() { console.log(this) }
    }
    const fn = new A().a()
    fn() // undefined
    const { b } = new A() // 结构复赋值 依据原型链结构
    b() // undefined

    // 取值函数（getter）和存值函数（setter）
    class A {
      get b() { console.log('getter') }
      set b(val) { console.log('setter') console.log(val) }
    }
    const a = new A()
    a.b = 1 // setter 1
    a.b // getter

    // Class 的 Generator 方法
    class Foo {
      static * [Symbol.iterator]() {
        for (let a of [1, 2, 3]) {
          yield a;
        }
      }
    }
    for (let x of Foo) {
      console.log(x); // 1 2 3
    }

    // Class的静态方法
    class Foo { // 类被看做实例的原型 在方法前加static关键字 标识该方法为静态方法 如$.ajax等都为静态方法
      static a() { this.foo() }
      static foo() { console.log(this) }
    }
    Foo.a() // class Foo 静态方法中的this‘默认’指向类本身 而不是实例对象
    new Foo().a() // .a is not a function
    class Bar extends Foo { // 静态方法的继承
      static bar1() {
        Bar.foo() // class Bar
      }
      static bar2() {
          super.foo() // class Bar super虽然指向__proto__(class Foo)但会call(this) 所以这里输出的仍是calss Bar
      }
    }

    // 实例属性 静态属性 私有属性 新写法
    class Bar extends Foo {
      b = 1; // 实例属性的新写法 清晰无this 可以提前设置默认值
      static c = 3; // 静态属性新写法
      #d = 4; // 私有属性 (js是一门动态语言没有类型声明 私有属性的声明没有采用private关键字 @已经被留给了Decorator)
      constructor() {
        super()
        console.log(this.b) // 1
        this.b = 2; // 修改默认值 实例属性的老写法
        console.log(this.b) // 2
        console.log(Bar.c) // 3
        console.log(this.#d) // 4
      }
      #bar() {} // 私有方法新写法 仅允许在类内部调用 不暴露给外部 (react环境中暂不支持)
      // _bar() {} // 私有方法老写法 仅仅是约定
    }
    // Bar.c = 3 // 静态属性老写法

    // 私有属性 getter和setter
    class A {
      #xValue = 1;
      get #x() { return #xValue; } // 私有属性的get set
      set #x(v) { this.#xValue = v; }
    }

    // new.target 通过new命令调用构造函数返回构造函数本身
    function A() {
      console.log(new.target) // 如果使用
    }
    A() // undefined
    new A() // f A() {}
    class A {
      constructor() {
        console.log(new.target)
      }
    }
    class B extends A {
      constructor() {
        console.log(new.target) // class B  类中new.target返回类本身
        super() // class B   call(this)会影响new.target
      }
    }
  ```
## Class 继承
  ```javascript
    // Es5的继承
    function A(a) { this.a = a }
    A.prototype.asd = function() { console.log(this.a) }
    B.prototype = new A() // 原型链继承
    B.__proto__ = A // 为了实现静态属性方法的继承
    function B(a, b) { this.b = b; A.call(this, a) } // 构造函数继承（Es5构造函数继承先创建子类this 然后再将父类方法添加到this上）
    B.prototype.get1 = function() { this.asd() }
    B.prototype.get2 = function() { Object.getPrototypeOf(this).asd.call(this) }
    b = new B('a', 'b')

    // Es6的继承
    class A {
      constructor(a) { this.a = a }
      asd() { console.log(this.a) }
      static aaa() { console.log(this) }
    }
    class B extends A { // B.prototype = new A();（原型链继承） B.__proto__ = A (为了实现静态属性方法的继承)(坑：Object.getPrototypeOf(B) = A 这样的赋值不被允许)
      constructor(a, b) {
        // 子类继承必须在constructor中调用super否则会报错
        // 因为子类的this在构造函数继承的实现上是通过调用父类构造函数得到父类实例对象，在对其加工(添加自身的属性方法)最终得到自身this（这于Es5继承机制完全不同）
        super(a) // A.prototype.constructor.call(this, a) // super作为函数使用代表父类的构造函数并自动call(this)
        this.b = b
        // console.log(super) // 直接打印super会报错 因为js引擎无法知道这个super是作为方法调用 还是作为对象使用
      }
      get1() { this.asd() }
      // super作为对象使用 获取(调用) super相当于Object.getPrototypeOf(this) 在普通方法中指向父类原型对象 在静态方法中指向父类
      get2() { super.asd() } // Object.getPrototypeOf(this).asd.call(this) // b.__proto__.asd.call(this) // B.prototype.asd.call(this) // a.__proto__.asd.call(this) // a.__proto__.asd.call(this) // A.prototype.asd.call(this)
      static bbb() { super.aaa() } // Object.getPrototypeOf(this).aaa.call(this) // A.aaa.call(this)
      // super作为对象使用 设置(赋值) super相当于this 在普通方法中指向实例对象 在静态方法中指向子类
      set1() { super.asd = 'asd' } // this.asd = 'asd' // b.asd = 'asd'
      static set2() { super.asd = 'asd' } // this.asd = 'asd' // B.asd = 'asd'
    }
    const b = new B('a', 'b')
    b.get1() // 'a'
    b.get2() // 'a'
    console.log(b) // B {a: "a", b: "b"}
                   //   a: "a"
                   //   b: "b"
                   //   __proto__: A
                   //     constructor: class B
                   //     get1: ƒ get1()
                   //     get2: ƒ get2()
                   //       __proto__:
                   //       asd: ƒ asd()
                   //       constructor: class A
                   //       __proto__: Object
    // 术语 原型我们指__proto__ 原型对象prototype
    Object.getPrototypeOf({__proto__: {a: 1}}) // {a: 1} 获取一个对象的原型
    Object.setPrototypeOf({}, {a: 1}) // {__proto__: {a: 1}} 设置一个对象的原型
    Object.create({a: 1}, {foo: {value: 1}}) // {foo: 1, __proto__: {a: 1}} 创建一个对象其原型为第一个参数 第二个参数设置所有属性的描述对象
    // Es6可以自定义原生数据结构 Es5无法做到（因为Es5先创建子类实例对象this 再将父类的属性添加到this 由于父类的内部属性无法获取 导致无法继承原生的构造函数）
    class VersionArray extends Array {
      constructor() {
        super();
        this.history = [[]]
      }
      commit() { // 暂存快照
        this.history.push(this.slice())
      }
      revert() { // 回退到上一快照版本
        this.splice(0, this.length, ...this.history[this.history.length - 1])
      }
    }
  ```
## 修饰器 | 装饰器
  ```javascript
    // 1.类的 修饰器 @后跟 函数名 或 匿名函数
    @d // 等价于 @(target) => target.a = 1 等价于 @function(target) { target.a = 1 }
    class A {}      // 被修饰的类
    function d(target) { target.a = 1 } // 类的修饰器只会接收到1个参数为 类本身
    console.log(A.a) // 1
    // 编译后的结果为
    let _class
    let A = d(_class = class A {}) || _class
    function d(target) { target.a = 1 }
    // 传参形式
    @f(1)
    class A {}
    function f(arg) {
      return function(target) {
        target.a = arg
      }
    }
    console.log(A.a)
    // 修饰器对类行为的改变是在编译时发生的 而非 运行时
    // 实际开发中React结合Redux
    class A extends React.Component {}
    export default connect(mapStateToProps, mapDispatchToProps)(A)
    // 修饰器写法
    @connect(mapStateToProps, mapDispatchToProps)
    export default class A extends React.Component {}

    // 2.类方法的 修饰器 提供对属性的修饰 也就是 描述属性
    class A {
      @d
      add() {}
    }
    function d(classPrototype, matchName, descriptor) { // 类方法的修饰器接收到的参数为 类的原型 该属性(方法名) 该方法的描述对象
      descriptor.enumerable = true
      // 默认取descriptor 不用显示声明(return descriptor)
    }
    // 在解析的时候会调用 Object.defineProperty(classPrototype, matchName, descriptor)
    for (let v in new A()) console.log(v) // add 正常class原型属性都是不可枚举的通过修饰器改变这一行为
    class A {
      @log
      add(a, b) { return a + b }
    }
    function log(prototype, methodName, descriptor) {
      let oldVal = descriptor.value
      descriptor.value = function(...args) {
        console.log('日志信息')
        return oldVal.apply(this, args)
      }
    }
    new A().add(1, 2) // '日志信息' 3
    // 方法有多个修饰器
    class A {
      @d(1)
      @dd(2)
      add() {}
    }
    function d(arg) {
      console.log(arg)
      return (p, n, d) => {
        d.value = arg
        console.log('d')
      }
    }
    function dd(arg) {
      console.log(arg)
      return (p, n, d) => {
        d.value = arg
        console.log('dd')
      }
    }
    // 1 2 dd d 函数调用的执行顺序为从外而内 但修饰器执行顺序由内而外
    new A().add // 1
    // 修饰器不能用于函数 因为函数存在提升 类不存在提升可以使用

    // 用修饰器实现mixin混入模式 mixin.js
    export function mixin(...list) {
      return function(target) {
        Object.assign(target.prototype, ...list)
      }
    }
    import {mixin} from 'mixin.js' // 使用
    @mixin({ foo() {console.log('foo')} })
    class A {}
    new A().foo() // foo
  ```
## Es6模块规范
  ```javascript
    // commonjs模块规范 运行时确定依赖
    module.export = { a() {} } // 导出 export 为 module.export的引用
    const {a} = require('c.js') // 本质是加载整个模块 在读取相应方法 如果不是在运行时是拿不到这个对象 导致编译时做不了“静态优化” 不利于类型检测等
    // Es6模块规范 编译时确定依赖
    export function a() { } // Es6模块不是对象 通过显示声明export指令导出指定代码 或者通过export default默认导出
    import {a} from 'c.js' // 只加载a方法 不会加载其余方法 效率高 编译时加载 类型检测成为可能
    // Es6自动启用严格模式 即 'use strict' 在严格模式中 顶层this指向undefined

    // export 明确显示声明导出变量
    export const a = 1; // 必须具名 错误写法  export 1; const a = 1 export a;
    export function b() { } // 错误写法 export () => { }
    // export等价写法 优先使用这种方式 清晰看出导出了那些变量
    export {a as c, b} // 直接指定要输出的一组变量可以起别名 并不是导出一个匿名对象 压根就不支持:
    export default function() {} // 默认导出 可以导出匿名成员 完全等价于export {a as default}
    // import
    true && import 'a' // 报错 import在编译时执行 具有“提升”效果 不能与变量表达式同用
    import d from './c' // 默认导入 完全等价于 import {default as d} form 'c'
    import d, {c as a, b} from './c' // 如果连写 默认导入必须写到最前面 按需导入也可以起别名
    import * as obj from './c' // 导入所有 import语法.js是可以省略的 node_modules模块不需要写路径
    import 'lodash' // 仅仅执行lodash模块 却不导入任何值

    // export 与 import 的复合写法
    export {a, b} from './c' // 该文件仅仅起到转发作用a,b在该文件中不可用 形式上等价于 import {a, b} from 'c'; export {a, b}
    export {a as default} from './c' // 具名接口改为默认接口
    export {default as b} from './c' // 默认接口改为具名接口
    // 模块的继承 （如下实现了 在原有模块基础上，重写默认接口，添加一个常量）
    export * from './c' // 这种写法导致：c模块导出的默认接口将被忽略
    export const e = 3.14
    export default () => {}
    // 为了做到形式的对称 通过babel可以实现如下复合写法
    // m.js
    export const a = 'a'
    export default function b() { return 'b' }
    // h.js
    export * as s from './m'   // 模块导出 { s: { a: 'a', default: function b() {} } }
    export s from './m'        // 模块导出 { s: function b() {} }
    export s, { a } from './m' // 模块导出 { s: function b() {}, a: 'a' }

    // import() 由于import指令是编译时执行 无法替代require动态加载的特点 故引入import()
    // import()是异步加载 而 require()是同步加载
    import('./c').then(({a, default: def}) => {}).catch() // import()返回promise 在then里直接通过结构赋值 拿到接口(default是保留关键字 通过结构赋值时 必须起别名)
    Promise.all([import(), import()]).then([{default: a}, {default: b}]).catch() // 加载多个模块
    // 路由懒加载（按需加载） 当用户跳转到相应的路由 才会去执行函数 才去加载相应的组件
    const Login = () => import('@/components/Login') // 如果直接写成 Login = import('@/components/Login') 那执行到这一行的时候就已经加载了相应的组件
  ```
## Es6模块规范 在浏览器 Node中的使用
  ```javascript
    1.//浏览器是同步加载常规的script标签 要实现异步加载
    <script src="foo.js" defer></script> // dom渲染完其他脚本加载完执行 多个defer按出现顺序执行
    <script src="foo.js" async></script> // 下载完就执行不能保证加载顺序

    // 浏览器中使用es6模块加载 dom渲染完执行 多个module按出现顺序执行
    <script src="foo.js" type="module"></script>
    // 拥有模块作用域 模块内部的顶层变量 外部不可见
    // 可以使用import export等指令
    // 默认就是严格模式 顶层this指向undefined
    // 多次import同一个模块只会加载一次

    1.1//commonjs模块输出的是值的拷贝 运行时编译
    // 1.js
    let num = 1;
    function add() { ++num }
    module.exports = { num, add }
    // 2.js
    const obj = require('./1.js');
    console.log( obj.num ) // 1
    obj.add()
    console.log( obj.num ) // 1 原始类型的值 会被缓存

    1.2// Es6模块输出的是值的动态引用 编译时输出接口
    // 1.js
    export const num = 1;
    export function add() { ++num }
    // 2.js
    import {num, add} from './1.js';
    console.log(num) // 1
    add()
    console.log(num) // 2

    2.// Node中使用es6模块加载要求文件以.mjs后缀 require命令不能加载.mjs文件 .mjs文件中使用就只能使用import命令
    // Node8.5.0以上版本 使用--experimental-modules来开启试验阶段
    node --experimental-modules 2.mjs

    // Es6模块 加载 commonjs模块
    module.exports = {a: 1}; 会被视做默认导出 export default {a: 1};
    import obj from '';
    console.log(obj) // {a: 1}
    // commonjs模块 加载 Es6模块 不能使用require命令 使用import动态导入
    export const a = 1;
    export default {b: 1};
    import('').then(res => console.log(res)) // { default: {b: 1}, a: 1 }

    // commonjs es6 处理循环加载 问题
    // commonjs模块加载原理 require指令实际上是加载了一个对象
    {
      id: '...', // 模块名
      exports: { ... }, // 输出的各个接口 再次加载该模块 也是直接在该属性取值 会缓存
      loaded: true, // 该模块是否执行完毕
      ...
    }
    commonjs模块 处理循环加载 只会输出已执行部分
    // 2.js
    const a = require('./1.js');
    console.log(a, 2);
    exports.b = 'b';
    // 1.js
    const b = require('./2.js');
    console.log(b, 1);
    exports.a = 'a';
    // 执行 node 2.js
    {} 1
    { a: 'a' } 2

    es6模块 处理循环加载 会认为想要加载的接口已经存在
    // 1.mjs
    import {foo} from './2.mjs';
    console.log(foo);
    export const bar = 'bar';
    // 2.mjs
    import {bar} from './1.mjs';
    console.log(bar);
    export const foo = 'foo';
    // 执行 node --experimental-modules 2.mjs
    foo is not defined
  ```

