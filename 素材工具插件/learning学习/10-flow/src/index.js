// js弱类型 和 java强类型
// 弱类型 一个变量的类型是不固定的
// 动态类型 和 静态类型
// 动态类型 代码检测是在运行时  静态类型则是在编译时
// 静态类型 优点 1.更早的发现bug 2.减少不必要的判断类型逻辑 3.便于代码的重构 4.增强IDE功能
// 缺点 1.增加代码量

// flow 仅仅是一个工具
// flow 的添加方式 1.行内注释的方式 2.直接通过js代码结构（推选）
// npx flow init 初始化基本的配置文件
// 给文件添加@flow 这个文件才会被flow检测 这是必须的


// @flow

// let num /*: number */ = 1

// number类型  number  可以是：数字 NaN Infinity
// string类型  string  可以是：字符串
// boolean类型 boolean 可以是：true false
// void类型    void    可以是：undefined
// null类型    null    可以是：null
// any类型     any     可以是：任意类型

// Array类型   Array<any> (必须指定数组中成员的类型)
let arr: Array<number|string> = [1, 2, '3']

function add(arr: Array<number>) {
  return arr.reduce((b, a) => b + a, 0)
}
add([1, 2, 3])

// 函数类型   (n: number) => void
let fn: (arr: Array<number>) => number
fn = add

function tack(cb: () => void) {} // 指定必须有一个回调函数
tack(function() {})

// Maybe类型  ?number (类似于一种组合类型 相当于添加了 undefined 和 null 这2个类型)
function m(num: ?number) { console.log(num || 0) } // 函数可以传参 可以不传
m()
m(null)
m(undefined)
m(1)

// Object类型 {}
function o(obj: {name: string, hellow: () => void}) {
  obj.hellow()
}
o({name: '小明', hellow() { console.log(this.name) } })

function ajax(obj: { type: string, success: () => void }) {}
ajax({
  type: 'POST',
  success() {}
})

function fn2(obj: {a: number, b: number}) {
  const { a, b } = obj // 结构赋值的方式 没有办法在在函数参数的位置使用了
  return a + b
}
fn2({ a: 1, b: 2 })