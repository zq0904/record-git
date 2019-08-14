// // 基本类型
// const b: boolean = true // 布尔
// const n: number = 0o744 // 数字 ts中所有数字均为浮点数 还支持二进制和八进制
// const s: string = `s${1}` // 字符串 包括模板字符串
// const arr1: (number|string)[] = [1, '2'] // 数组
// const arr2: Array<number|string> = [1, '2']
// const tuple: [string, number] = ['1', 1] // 元组类型 表示固定数量和类型的数组
// // tuple[3] = '2' // 联合类型 ??? 是否还存在
// enum Color { Red, Blue, Yellow } // 枚举 为数值集提供友好名称的一种方式 
// // 枚举类型只声明不赋值 等同于编号从0开始 { Red: 0, 0: 'Red', Blue: 1, 1: 'Blue', Yellow: 2, 2: 'Yellow'  } 
// const c: Color = Color.Red
// const any: any = true // any 允许您在编译期间逐步选择加入和退出类型检查
// const arr: any[] = [1, '2', true]
// const fn = (): void => {} // 没有任何类型 通常描述没有返回值的函数的返回类型
// let nul: null = null // null undefined 并不是非常有用
// let unde: undefined = undefined
// const fn2 = (): never => { throw new Error('1') } // never 函数返回的端点必须是不可到达的
// const fn3 = (): never => { while (true) {} }
// const objec: object = [] // object 表任何不是 number boolean string symbol null undefined 的类型

// // 类型断言(有些情况下 开发者比ts更了解当前的状况 - 使用类型转换，但不执行特殊检查或重组数据的方式)
// let str: any = '123'
// const strLength1: number = (<string>str).length
// const strLength2: number = (str as string).length // 推选 jsx的ts 只允许使用as

// // 结构赋值 默认值 中 使用类型检测
// const { aa: asd , bb = 2 }: { aa: number, bb?: number } = { aa: 1 } // console.log(asd, bb) asd 1 bb 2
// const fn4 = ({ a, b = 'b' }: { a: string, b?: string }) => {} // fn4({a: 'a'}) a 'a' b 'b'
// type C = { a: string, b?: string } // 完全等价 必须传入一个对象 必须包含a b可以不传
// const fn5 = (obj: C): void => { const {a , b = 'b'} = obj }
// const fn6 = ({ a = 'a', b ='b' } = {}) => {} // fn6() a 'a' b 'b' ab都可以不传

// // 接口
// interface L { a: string, c?: number }
// const fn7 = (obj: L) => { console.log(obj) }
// // fn7({ a: '1', c2: 1 }) // 直接传递一个值 值多余接口的“规格” 是不允许的 (会认为c2是你打错了 应该是c)
// fn7({ a: '1', b: 1 } as L) // 使用类型断言 绕过
// interface Lp { a: string, c?: number, [propName: string]: any } // 使用索引签名 绕过
// fn7({ a: '1', b: 1 } as Lp)
// const myObj2 = { a: '1', b: 1 } // 利用 类型兼容 但你不应该这么做
// fn7(myObj2)

// // 只读属性 只能在首次创建对象时进行修改
// interface Point {
//   readonly x: number
//   readonly y: number
// }
// const p1:Point = { x: 1, y: 2 } // 不能使用修改操作 p1.x = 1
// const arr3: ReadonlyArray<number> = [1, 2] // 只读数组 不能修改数组 如 arr3.push(1) arr3.length = 1

// // 接口 描述函数 使用 调用签名
// interface SearchFn {
//   (a: string, b: number): void // 形式参数 a b 不一定非得叫 a b
// }
// const searchFn: SearchFn = (c: string, d: number) => {}

// // 接口 描述那些能够“通过索引得到”的类型 a[10] a['10']
// interface StringArr {
//   [index: number]: string
// }
// const arr4: StringArr = ['1']
// const num: string = arr4[0]
// interface NumberDictionary {
//   name: string // name string 一定包含在了 [index: string] 索引签名中 所以索引签名必须有string类型
//   [index: string]: string | number
// }
// // 接口 描述类
// interface ClassDate {
//   time: Date
//   setTime(d: Date): boolean
//   // new (t: Date)
// }

// class D implements ClassDate {
//   time: Date
//   setTime = (d: Date) => {
//     return d.getTime() > Date.now()
//   }
//   constructor(t: Date) { // 当一个类实现一个接口 只会对其实例属性进行检测 constructor存在于类的静态部分 不会检测
//     this.time = t
//   }
// }
// // 接口的继承 利于接口的模块化 可以多继承（类是不可以多继承的）
// interface Animal {
//   name: string
// }
// interface Animal2 {
//   alias: string
// }
// interface People extends Animal, Animal2 {
//   age: number
// }
// const people: People = { name: '张三', alias: '小胡', age: 12 }

// // 接口 描述混合类型
// interface Counter {
//   (a: number)
//   index: number
//   end(): void
// }
// function counter(): Counter  {
//   const fn = (a: number) => {}
//   fn.index = 0
//   fn.end = () => {}
//   return fn
// }

// // 接口 继承类 会继承其成员
// class Obj {
//   private state: any
//   protected b: boolean
// }
// interface SubObj extends Obj { // 当一个接口继承了 私有或受保护的类成员时 意味着 只能是其子类才能实现这个接口（只有子类才有声明在父类的私有或受保护的类成员）
//   end(): void
// }
// class subObj extends Obj implements SubObj {
//   end() { console.log(this.b) }
// }

// // 类
// class CC {
//   public a: string // 默认 public
//   private b: string // 私有成员 只能在类的“内部”使用
//   protected c: string // 受保护成员 只能在类的“内部”及其子类中使用
//   readonly d: string = 'd' // 只读属性 必须在声明时或构造函数里被初始化
//   readonly e: string
//   static g: string = 'g'
//   // 参数属性 f 在一个地方定义并初始化一个成员（非常方便）这种操作的关键在于声明类型的同时 必须指定访问限定符 来达到初始化成员目的
//   constructor(a: string, b: string, c: string, e: string, private f: string) { // 构造函数如果被protected修饰 意味着该类只能被继承不能 直接实例化new
//     this.a = a
//     this.b = b
//     this.c = c
//     this.e = e
//   }
//   look() { console.log(this.b) }
//   // get set 只带有 get不带有 set的存取器自动被推断为 readonly 
//   get bb(): string { // 注意点 要求你将编译器config target设置为ES5或更高 因为ts没有相应polyfill 
//     return this.b
//   }
//   set bb(newB: string) {
//     this.b = newB
//   }
// }
// const cc: CC = new CC('1', '2', '3', 'e', 'f') // 声明了一个类 实际上就是声明了一种类型 即类的实例类型 (正因为这样 接口才可以直接继承类)
// const ccc: typeof CC = CC // typeof CC 根据实例的类型获取类的类型

// // 抽象类 不能被实例化 其抽象方法 不能有具体实现 继承的子类必须有具体实现
// abstract class Asd {
//   constructor(public a: string) {}
//   abstract b(): void
// }
// class subAsd extends Asd {
//   b(): void { }
//   asd() { console.log('asd') }
// }
// new subAsd('a')

// // 函数
// function fn8(x: number) {} // 函数的参数类型与返回值类型单独声明 (ts通过类型推断可以自动推断返回值类型 所以通常省略)
// const fn9: (y: number) => void = (x: number) => {} // 完整函数类型 返回值类型不可省略 形参名任意类型匹配就认为是有效的
// // 函数参数默认值
// const fn21 = (b: number = 1) => {} // 注意 b可以不传 不是一定要传 默认值为1 而不是写成 (b?: number = 1) => {}
// const fn22 = (b?: number) => { b = b ? b : 1 } // 很繁琐
// const fn23: (b?: number) => void = (b = 1) => {} // 依赖于fn23的类型
// function fn10(a: string, b: string = 'b', c?: string) {} // 可选参数必须在必填参数后面 默认参数可以通过传递undefined来触发
// function fn11(...args: Array<string>) {} // 剩余参数
// // 为同一个函数提供多个函数类型定义来进行函数重载 这个函数调用时必须符合重载规则 会依次查找重载列表尝试重载定义
// function sel(x: {a: number}[]): number
// function sel(x: number): {a: number}[]
// function sel(x): any {
//   if (typeof x === 'object') {
//     return 1
//   } else if (typeof x === 'number') {
//     return [{a: 1}]
//   }
// }

// // 泛型
// function fn12<T>(a: Array<T>): Array<T> { return a } // 泛型函数 当调用这个函数的时候传入类型 以确定T的类型
// fn12<string>(['1']) // 直接使用<>来明确传入的类型
// fn12(['1']) // 直接使用 类型推断
// const fn13: <U>(a: Array<U>) => Array<U> = fn12 // 泛型参数名 也属于形式参数 只要对应就可以
// const fn14: { <U>(a: Array<U>): Array<U> } = fn12 // 使用带有调用签名的对象字面量来定义泛型函数 (像 内联的 接口)
// interface Fn { // 泛型接口
//   <T>(a: Array<T>): Array<T>
// }
// const fn15: Fn = fn12
// interface Fn1<T> { // 泛型参数当作接口的参数 接口内部能拿到泛型参数
//   (a: Array<T>): Array<T> 
// }
// const fn16: Fn1<number>= fn12
// class As<T> { // 泛型类 泛型参数只能用于实例属性 不能用于静态属性
//   constructor(public a: T) {}
// }
// new As<number>(1)
// interface Ty {
//   length: number
// }
// // 泛型约束 类型 T 继承 接口
// const fn17 = <T extends Ty>(a: T): T => {
//   console.log(a.length)
//   return a
// }
// fn17({length: 1})
// // 可以声明一个泛型参数 受另一个泛型参数约束
// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key] }
// getProperty({ a: 1 }, 'a')
// // 泛型中使用类类型
// function fn18<T>(a: { new(): T }): T {
//   return new a()
// }

// // 枚举 是一种类型 大部分枚举编译阶段会产生真实的对象
// enum Direction { // 数字枚举 具有反向映射(1 -> 'Up') 会解析为 { Up: 1, Down: 2, 1: 'UP', 2: 'Down' }
//   Up = 1, // 不指定初始值 默认从0开始自增
//   Down
// }
// const direction: Direction = Direction.Up
// enum Direction2 { // 字符串枚举 { Up: 'Up', Down: 'Down' }
//   Up = 'Up',
//   Down = 'Down'
// }
// enum Direction3 { // 异构枚举 { Up: 1, 1: 'Up', Down: 'Down' }
//   Up = 1,
//   Down = 'Down'
// }
// enum Dir { // 当满足条件时 枚举成员被当作是常量
//   A, // 枚举的第一个成员且没有初始化器 将被赋予0
//   B, // 不带有初始化器且它之前的枚举成员是一个数字常量 将被赋予上一个值+1
//   C = A | B,
//   D = '123'.length
// }
// interface Direction4 { A: Direction2.Up } // 枚举成员成为了类型
// const enum Dir2 { A } // const枚举 编译阶段会被删除 在使用的地方会直接内联 常量枚举不允许包含计算成员
// declare enum Enum { // 外部枚举用来描述已经存在的枚举类型
//   A = 1
// }

// // 类型兼容
// const y = { a: 1, b: 2 }
// const x: { a: number } = y // 如果 x的类型 要兼容 y的类型 那么y至少具有与x相同的属性
// function fn19(x: {a: number}) {}
// fn19(y)

// // 高级类型
// class F {
//   public f: string = 'f'
//   ff() {}
// }
// class S {
//   public s: string = 's'
//   ss() {}
// }

// const assign: F & S = Object.assign(new F(), new S()) // 交叉类型 将多个类型合并为一个类型 同时满足多个类型 是一种且的关系
// const empty: null | undefined | string = null // 联合类型
// const fn20 = (n: number): F | S => n < 0.5 ? new F() : new S()
// fn20(1).toString; // 联合类型访问属性 只能访问共有属性

// const fs = fn20(0.3) // 有时候 你想区分fs的类型 判断后进一步操作 (比如通过方法是否存在判断 但是你会收到联合类型的错误)
// if ((fs as F).ff) { // 使用类型断言 内部还要使用 类型断言 (不通用)
//   (fs as F).ff()
// }
// function isF(s: any): s is F { // 自定义类型保护 必须返回一个类型谓词 这里是 s is F
//   return (s as F).ff !== undefined
// }
// if (isF(fs)) { fs.ff() }
// if (fs instanceof F) { fs.ff() } // instanceof typeof 是内置的类型保护 
// if (typeof empty  === 'string') { empty.length }
// const un: string = null // 类型检查器认为 null与 undefined可以赋值给任何类型
// // un!.charAt(0) // !表示 从类型中排除unll和undefined
// type G<T> = { val: T } // 类型别名 类型别名不能被 extends 和 implements 而接口可以
// let a: 2 | 3 | '1' = '1' // 字符串字面量类型 数字字面量类型
// interface Square {
//   k: 's', // 具备普通的单例类型(特征属性)
//   s: number
// }
// interface Circle {
//   k: 'c',
//   r: number
// }
// type Shape = Square | Circle // 可辨识联合
// function getPerimeter(shape: Shape): number {
//   switch (shape.k) { // 特征属性上的类型保护
//     case 's':
//       return 4 * shape.s
//     case 'c':
//       return 2 * Math.PI * shape.r
//   }
// }
// // this类型
// class Calculator {
//   constructor(private num: number = 0) {}
//   add (num: number): this {
//     this.num += num
//     return this
//   }
// }
// new Calculator().add(1).add(2)
// // 索引类型 K extends keyof T 表K类型是T类型的键的联合 运行时确切的相应类型T[K][]
// function pluck<T, K extends keyof T>(obj: T, arr: K[]): T[K][] {
//   return arr.map(key => obj[key])
// }
// pluck({a:1}, ['a'])

// interface Person {
//   name: string
//   age: number
// }
// type ReadOnly<T> = {
//   readonly [K in keyof T]: T[K] // 映射类型
// }
// const p: ReadOnly<Person> = {name: '1', age: 12} // 将得到一个 基于Person接口的 只读的类型
// const pick: Pick<Person, 'name'> = {name: '1'} // ts内置的Pick映射类型 从一个现有类型中挑选出一部分作为新类型 Readonly
// // 内置的有条件类型
// type T1 = Exclude<string|number, string> // number Exclude<T, U> 从T中剔除可以赋值给U的类型
// type T2 = Extract<string, string|number> // string Extract<T, U> 提取T中可以赋值给U的类型
// type T3 = NonNullable<string|null> // string NonNullable<T> 从T中剔除null和undefined
// type T4 = ReturnType<{(): void}> // void ReturnType<T> 获取函数返回值类型
// type T5 = InstanceType<typeof CC> // CC InstanceType<T> 根据一个类的类型获取实例的类型

// 内部模块 -> 命名空间
// 外部模块 -> 模块

// 模块
// export { T5 } // 按需导出
// export default T5 // 默认导出
// export {T6 as T7} from './1' // 重新导出 扩展|整合其它模块
// import { T5 as T6 } from './1' // 按需导入
// import A from './1' // 默认导入
// import * as A from './1' // 导入所有
// import './1' // 具有副作用的导入模块 用户不关注它的导出
// export = {a: 1} // 为了支持CommonJS和AMD的exports, ts提供了 export = 语法
// import obj = require('./1')

// // 命名空间
// namespace A {
//   export interface Asd {
//     i(): void
//   }
// }
// import BB = A // 命名空间 使用 别名
// class AA implements BB.Asd {
//   i() {}
// }

// // 声明合并
// // 接口合并 两个同名接口中声明的 非函数成员的类型必须相同 函数成员会被当函数的重载 后面的接口具有更高的优先级
// interface Box { height: number, a(a: number): number }
// interface Box { width: number, a(a: string): string }
// let box: Box = { height: 5, width: 6, a<T>(a: T) { return a } }
// box.a('1')
// // 接口与类合并 相当于扩展 实例成员 class Foo1 { x: number; y: string }
// class Foo1 { x: number }
// interface Foo1 { y: string }
// // 命名空间合并
// namespace Animals { export class A {} }
// namespace Animals { export class B {} }
// // 命名空间与类合并 相当于扩展 类的静态成员 class Album { static AlbumLabel = class AlbumLabel { } }
// class Album {}
// namespace Album { export const a = '' }
// Album.a
// // 命名空间与函数合并 相当于扩展 函数的静态成员 function buildLabel(): void { } buildLabel.a = ''
// function fn(): void { }
// namespace fn { export const a = '' }
// // 命名空间与枚举合并 相当于扩展 属性成员 Col = { span: 1, '1': 'span', mixCol: '2' }
// enum Col { span = 1 }
// namespace Col { export const mixCol = '2' }
