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
  
  Object.getOwnPropertyDescriptor({a: 1}, 'a') // 获取对象一个属性 的 描述对象 （如是否可以枚举等）
  {
    value: 1,
    writable: true, // 可写
    enumerable: true, // 可枚举 如果为false  for in Object.keys() JSON.stringify() Object.assign() 都会忽略该值
    configurable: true // 可配置
  }
  // for in 会遍历对象原型上的属性或方法 可以设置enumerable为false来避免
  // 如 数组的length属性、Es6的 class 中的原型方法都是不可枚举的 在实际使用中应该多使用 Object.keys() 少用for in
  Object.getOwnPropertyDescriptors([1]) // 返回自身所有属性的描述对象
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
    getFoo() { // 使用super关键字 只能使用 方法简写
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

  //  WeakMap() 与 Met() 区别 1.成员只能是对象 2.WeakSet中的对象都是弱引用（垃圾回收机制不考虑 WeakSet 对该对象的引用, 如果其他对象都不再引用该对象, 那么垃圾回收机制会自动回收该对象所占用的内存, 不考虑该对象还存在于 WeakSet 之中）
  const wm = new WeakMap()
  const dom = document.querySelector('a') 
  wm.set(dom, () => console.log(1)) // 设置
  wm.get(dom) // 获取
  wm.delete(dom) // 删除
  wm.has(dom) // 检测是否存在
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
    console.log('1. Promise 新建后立即执行')
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
  // Promise 类 构造函数 原型方法
  // Promise.prototype.then()
  asyncLoad('https://timgsa.baidu.com')
  .then(() => console.log('success'), () => console.log('error')) // 第二个回调 不会捕获 当前.then中第一个回调的错误 (所以说一般不要指定.then的第二个参数 而总是使用.catch)
  // Promise.prototype.catch 是 .then(null, rejection) 的别名
  asyncLoad('https://timgsa.baidu.com')
  .then(() => console.log('success'))
  .catch(() => console.log('error')) // .catch能捕获asyncLoad中 及 任何一个在.catch之前的.then中的 错误
  // .catch别名写法
  asyncLoad('https://timgsa.baidu.com')
  .then(() => console.log('success'))
  .then(null, (err) => console.log(123))



  ```
