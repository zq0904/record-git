# Js
## 常见基础方法
```javascript
  window.alert('参数非法\n请稍后重试') // 提示框包含确定按钮
  window.confirm('你确定要删除吗？') // 确认框包含确定和取消按钮 确定返回true 取消返回false
  window.prompt('请输入：', 'input默认值') // 弹框包含 一个输入框 确定和取消按钮 确定返回输入框输入的内容 取消返回null
  console.log() // 在控制台输出消息 一般用于调试
  console.log('before %c middle %c after','color: red; font-size:20px', 'color: blue;') // 在控制台输出带有颜色的字体
  document.write() // 将一个文本字符串写入一个由 document.open() 打开的文档流
  console.dir() // 打印出该对象的所有属性和属性值 一般用于查看dom元素的属性方法
  console.table({ a: 1 }) // 将数据以表格的形式显示
```
## 数据类型
```javascript
  // 简单数据类型
  number // 数字类型 包括 整数 浮点数 NaN
  string // 字符串类型
  boolean // 布尔类型（能够转换成false的有 0 NaN '' undefined null）
  undefined // 变量未初始化（定义变量 未赋值）void 0 === undefined 结果为true void 0 比 undefined省略了3个字节
  null // 值为空 用来销毁“释放”变量 typeof null 结果为'object'这是js历史遗留bug
  symbol // es6新增 Symbol('1') 主要用于保持绝对的唯一性
  // 复杂数据类型
  oject // 包括 对象 数组 函数等
  // typeof 用于判断一些简单的类型
  typeof(undefined) // 'undefined'
  typeof true // 'boolean'
  typeof 1 // 'number'
  typeof '1' // 'string'
  typeof Symbol('1') // 'symbol
  typeof(() => {}) // 'function'
  typeof {}; typeof []; typeof null // 'object'
```
## 隐式转换
```javascript
  + true; '1' - 0 // + - * / 都具备隐式转换
```
## 转意字符
```javascript
  \t // 制表
  \b // 空格
  \f // 进纸
  \\ // 斜杠
  \r // 回车
  \n // 换行
```
## 转换成数字类型
```javascript
  Number // 不能转换 数字开头的非纯数字字符串
  Number('123') // 123
  Number(true) // 1
  Number('') | Number(false) | Number(null) | Number([]) // 0
  Number(undefined) | Number([3,2]) | Number({}) | Number('1.a') // NaN
  Number([3]) // 3
  Number.parseInt // 主要用于取整 可以转换 数字开头的非纯数字字符串
  parseInt('123.a') // 123
  parseInt('') | parseInt(true)| parseInt(false)| parseInt(undefined)| parseInt(null)| parseInt([])| parseInt({}) // NaN
  parseInt('0x10') // 16
  parseInt('a', 16) // 10
  parseInt('010') // 10
  parseInt('010', 8) // 8
```
