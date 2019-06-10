// 尝试
interface O {
  first: string,
  last: string
}
const ss = (obj: O): string => obj.first + obj.last

const obj = {first: 'A', last: ' B'}
console.log(ss(obj))

class Student {
  res: string
  constructor(obj: O) {
    this.res = obj.first + obj.last
  }
}
console.log(new Student(obj))

// 基本类型
const b: boolean = true // 布尔
const n: number = 0o744 // 数字 ts中所有数字均为浮点数 还支持二进制和八进制
const s: string = `s${1}` // 字符串 包括模板字符串
const arr1: (number|string)[] = [1, '2'] // 数组
const arr2: Array<number|string> = [1, '2']
const tuple: [string, number] = ['1', 1] // 元组类型 表示数组 固定数量和类型
// tuple[3] = '2' // 联合类型 ??? 是否还存在
enum Color { Red, Blue, Yellow } // 枚举 为数值集提供友好名称的一种方式 
// 枚举类型只声明不赋值 等同于编号从0开始 { Red: 0, 0: 'Red', Blue: 1, 1: 'Blue', Yellow: 2, 2: 'Yellow'  } 
const c: Color = Color.Red
const any: any = true // any 允许您在编译期间逐步选择加入和退出类型检查
const arr: any[] = [1, '2', true]
const fn = (): void => {} // 没有任何类型 通常描述没有返回值的函数的返回类型
let nul: null = null // null undefined 并不是非常有用
let unde: undefined = undefined
const fn2 = (): never => { throw new Error('1') } // never 函数返回的端点必须是不可到达的
const fn3 = (): never => { while (true) {} }
const objec: object = [] // object 表任何不是 number boolean string symbol null undefined 的类型
// 类型断言
let str: any = '123'
const strLength: number = (<string>str).length
const strLength: number = (str as string).length

