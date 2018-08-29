// let const
for (let i = 0; i < 1; i++) {
  let i = 99
  console.log(i)
}
console.log(i) // for循环 ()里的i属于父作用域（不是全局作用域） {}内部属于子作用域（可以使用父作用域中的成员）

console.log(i) // var 具备变量提升 let const 不具备变量提升
{ i = 2; console.log(i); let i = 3 } // 暂时性死区: 一旦在一个块级作用域 声明了let命令 它所声明变量就绑定了这个区域 任何想在之前获取值的行为都会报错
var i = 1 // 暂时性死区的本质是 只要一进入当前作用域,所要使用的变量就已经存在了 但是不可获取 只有等到声明变量的那一行代码出现 才可以获取和使用该变量

function f() {console.log(1)} { function f() {console.log(2)} console.log(f()) } // E6由于块级作用域的出现 使得 函数的作用域也收到影响

const 声明常量 声明就应该赋值 仅保证引用不变 
E6变量声明有6种方式 var function let const import class

// 结构赋值
let [a, b = 2, ...c] = [1, , 2, 3] // 1 2 [2, 3] 结构赋值支持默认值
[x, y] = [y, x] // 交换变量
import {a: b} from 'c'  const {a: b} = require('c') let {a: b} = c() // 导出的对象中 按需加载 语义清晰
// 字符串扩展
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
// 正则扩展
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
// 数值扩展
// 函数扩展
// 数组扩展
// 对象扩展

// Set是一个构造函数 用来生成Set数据结构 类似数组 其成员的值都是唯一的
const s = new Set([1, 2, 2]) // 可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数
s // Set(3) {1, 2}   
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

// Map是一个构造函数 用来生成Map数据结构 类似对象数据结构 key值可以是对象等
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
