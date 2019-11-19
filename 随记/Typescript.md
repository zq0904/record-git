# TypeScript [官网](http://www.typescriptlang.org/docs/home.html)
## 基本类型
```typescript
  const n: number = 0o744 // 数字 ts中所有数字均为浮点数  还支持二进制和八进制
  const s: string = `s${1}` // 字符串 包括模板字符串
  const b: boolean = true // 布尔
  const arr1: (number|string)[] = [1, '2'] // 数组
  const arr2: Array<number|string> = [1, '2'] // 数组
  const tuple: [number, string] = [1, '2'] // 元组类型 表示固定数量和类型的数组
  enum Color { Red, Blue } // 枚举 为数值集提供友好名称的一种方式
  const c: Color = Color.Red
  const any: any = 1 // any类型 允许您在编译期间逐步选择加入和退出类型检查
  const fn1 = (): void => {} // void 描述没有返回值的函数的返回类型
  // const fn2: () => void = () => {}
  const nu: null = null // null undefined 并不是非常常用
  const un: undefined = undefined
  const fn2 = (): never => { throw new Error('x') } // never 函数返回的端点必须是不可到达的
  const fn3 = (): never => { while (true) {} }
  const obj: object = [] // object 表任何不是 number string boolean symbol null undefined 的类型
```
## 类型断言 (有些情况下 开发者比ts更了解当前的状况 - 使用类型转换，但不执行特殊检查或重组数据的方式)
```typescript
  const str: any = '123'
  const strLength1: number = (<string>str).length
  const strLength2: number = (str as string).length // 推选 tsx只允许使用as
```
## 结构赋值 默认值 中 使用类型检测
```typescript
  const { a: aa, b = 'b' }: { a: number, b?: string } = { a: 1 } // 对象结构 console.log(aa, b) // 1 'b'
  const fn1 = ({ a, b = 'b' }: { a: number, b?: string }) => {} // 函数第一个参数结构
  type C = { a: number; b?: string } // 别名
  const fn2 = (obj: C) => { const { a, b = 'b' } = obj }
  const fn3 = ({ a = 1, b = 'b' } = {}) => {} // fn3() console.log(a, b) // 1 'b'
```
## 接口
```typescript
  interface I { a: number; b?: string }
  const fn1 = (obj: I) => {}
  fn1({a: 1, c: 'c'}) // ts接口会约束“规格” (“c”不在类型“I”中)
  fn1({a: 1, c: 'c'} as I) // 使用类型断言 绕过
  interface Ip { a: number; b?: string; [propName: string]: any }
  fn1({a: 1, c: 'c'} as Ip) // 使用索引签名+类型断言 绕过
  const obj = { a: 1, b: 1 }
  fn1(obj) // 利用 类型兼容 但你不应该这么做
  interface Point {
    readonly: x: number; // 只读属性 只能在首次创建对象时进行修改
  }
  const p: Point = { x: 1 } // p.x = 2 不能修改
  const arr: ReadonlyArray<number> = [1, 2] // 只读数组 arr.push(1) arr.length = 1 不能修改数组
  // 接口 描述函数 使用调用签名
  interface Fn {
    (a: sting): void; // a 是形式参数 不一定非得叫a
  }
  const fn: Fn = (b) => {}
  // 接口 描述数组 (能够“通过索引得到”的类型)
  interface ArrString {
    [index: number]: string;
  }
  const arr: ArrString = ['1']
  const str: string = arr[0]
  interface Nd {
    name: string; // name 一定包含在了 字符串索引签名中 所以索引签名必须包含string类型
    [i: string]: string | number;
  }
  // 接口 描述类
  interface ClassDate {
    time: Date;
    set(d: Date): void;
  }
  class D implements ClassDate { // 类实现接口
    time: Date
    constructor(t: Date) { // 当一个类实现一个接口 只会对其实例属性进行检测 constructor存在于类的静态部分 不会检测
      this.time = t
    }
    set(t: Date) { this.time = t }
  }
  // 接口 描述混合类型
  interface Counter { // 描述了一个函数 具有1个静态属性和一个静态方法
    (a: number): void;
    index: number;
    end(): void;
  }
  function counter(): Counter  {
    const fn = (a: number) => {}
    fn.index = 0
    fn.end = () => {}
    return fn
  }
  // 接口继承接口 利于接口的模块化 可以多继承（类是不可以多继承的）
  interface A { name: string }
  interface B { age: number }
  interface C extends A, B { alias: string }
  const p: C = { name: '张三', age: 12, alias: '小胡' }
  // 接口继承类 会继承其成员
  class A {
    private s: any
    protected b: boolean
  }
  interface B extends A { // 当一个接口继承了 私有或受保护的类成员时 意味着 只能是其子类才能实现这个接口（只有子类才有声明在父类的私有或受保护的类成员）
    end(): void;
  }
  class SubA extends A implements B {
    end() { console.log(this.b) }
  }
```
## 类
```typescript
  class C {
    public a: string // 不写默认就是 public
    private b: string // 私有成员 只能在该类内部使用
    protected c: string // 受保护成员 只能在类的内部及其子类(通过extends继承的子类)中使用
    readonly d: string = 'd' // 只读属性 必须在声明时或构造函数里被初始化
    static e: string // 静态成员
    // 直接在构造函数中 使用访问限定符和类型声明 相当于在一个地方定义并初始化一个成员（非常方便）
    constructor(private f: string) {}
    // protected constructor() {} // 将构造函数标记为protected 意味着该类只能被继承 不能直接new
    // 只带有get 不带有set的存取器 自动被推断为 readonly
    get aa() { // 注意点 要求你将编译器config target设置为ES5或更高 因为ts没有相应polyfill
      return this.a
    }
    set aa(val: string) {
      this.a = val
    }
  }
  const c: C = new C('f') //  // 声明了一个类 实际上就是声明了一种类型 即类的实例类型 （正因为这样 接口才能继承类）
  const Cla: typeof C = C // typeof C 根据实例类型获取 类的类型
  // 抽象类 不能被实例化 其抽象方法 不能有具体实现 继承的子类必须有具体实现
  abstract class Asd {
    constructor(public a: string) {}
    abstract b(): void
  }
  class SubAsd extends Asd {
    b(): void {}
    asd() {}
  }
  new SubAsd('a')
```
## 函数
```typescript
  function fn1(x: number) {} // 函数的参数类型与返回值类型单独声明 (ts通过类型推断可以自动推断返回值类型 所以通常省略)
  const fn2: (y: number) => void = fn1 // 完整的函数类型
  function fn3(...args: Array<string>) {} // 剩余参数的类型
  // 函数参数默认值
  function fn4(x: number = 1) {} // x可传可不传 (注意 没有这种写法 (x?: number = 1) => {} )
  function fn5(x?: number) { x = x ? x : 1 } // 很繁琐的写法
  const fn6: (x?: number) => void = (x = 1) => {} // 依赖于fn5
  function fn7(a:string, x: nuumber = 1, y?: number) {} // xy均为可选参数 可选参数必须在必填参数后面 可选参数的默认值可以通过传递undefinde触发
  // 函数重载 (为同一个函数提供多个函数类型 函数调用时 ts会依次查找重载列表尝试重载定义 以确定当前函数的类型) 官方 建议将”精准“的重载 放到前面
  // 函数重载复用性较强时应该考虑泛型
  function fn8(s: number): number
  function fn8(s: any[]): any[]
  function fn8(s: any[] | number) {
    if (typeof s === 'number') return s
    return s
  }
  const n = fn8(1) // ts明确知道 在这种情况下 n是number类型 如果不使用重载ts会认为n是 number | any[]
  type FnType = typeof fn1 // 获取函数的类型 (一个class A 通过 typeof A 来获取类A的类型)
```
## 泛型 (解决 函数 接口 类的 类型得复用性)
```typescript
  // 泛型函数
  function fn1<T>(arr: Array<T>) { return arr }
  fn1<string>(['1']) // 直接使用<>来明确传入的类型
  const arr = fn1(['1']) // 使用 类型推断 ts会直接认为此时 T类型为string[]
  const fn2: { <U>(a: Array<U>): Array<U> } = fn1 // 使用带有调用签名的对象字面量来定义泛型函数 (像 内联的 接口)
  // 泛型接口
  interface Fn1 { <T>(a: Array<T>): Array<T> }
  const fn4: Fn1 = fn1
  interface Fn2<T> { // 泛型参数当作接口的参数 接口内部能拿到泛型参数
    (a: Array<T>): Array<T>;
  }
  const fn5: Fn2<string> = fn1
  // 泛型类 泛型参数只能用于实例属性 不能用于静态属性
  class A<T> {
    constructor(public a: T) {}
  }
  new A<string>('1')
  // 泛型参数
  const fn3: <U>(a: Array<U>) => Array<U> = fn1 // 泛型参数 也是形式参数
  interface Length { length: number }
  function fn6<T extends Length>(obj: T): T { return obj } // 泛型参数 可以继承 接口
  fn6({length: 1})
  function getObjVal<O, K extends keyof O>(obj: O, key: K): O[K] { return obj[key] } // 一个泛型参数 可以受另一个泛型参数约束
  getObjVal({ a: 1 }, 'a')
  function fn7<T>(fn: { new(): T }): T { return fn() } // 泛型中使用 类的类型
  class A {}
  const a: A = fn7(A)
```
## 枚举 (大部分枚举在编译阶段会产生真实的对象)
```typescript
  // 数字枚举 具有反向映射(1 -> 'Up') 会编译为 { Up: 1, Down: 2, 1: 'UP', 2: 'Down' }
  enum Direction {
    Up = 1, // 不指定初始值 默认从0开始自增
    Down
  }
  // 字符串枚举 会编译为 { Up: 'Up', Down: 'Down' }
  enum Direction2 {
    Up = 'Up',
    Down = 'Down'
  }
  // 异构枚举 会编译为 { Up: 1, 1: 'Up', Down: 'Down' }
  enum Direction3 {
    Up = 1,
    Down = 'Down'
  }
  enum Dir { // 当满足条件时 枚举成员被当作是常量
    A, // 枚举的第一个成员且没有初始化器 将被赋予0
    B, // 不带有初始化器且它之前的枚举成员是一个数字常量 将被赋予上一个值+1
    C = A | B,
    D = '123'.length
  }
  // const枚举 编译阶段会被删除 在使用的地方会直接内联 常量枚举不允许包含计算成员
  const enum Dir2 { A }
  // 环境枚举 用于描述已存在的枚举类型的形状
  declare enum Enum { A = 1 }
  interface I { A: Direction.Up } // 枚举成员成为了类型
```
## 类型兼容
```typescript
  // 如果x的类型要兼容y的类型 那么y至少具有与x相同的属性
  const y = { a: 1, b: 2 }
  const x: { a: number } = y
  function fn(x: { a: number }) {}
  fn(y)
```
## 高级类型
```typescript
  class A { a() {} } class B { b() {} }
  // 交叉类型 必须同时满足多个类型 是一种且的关系
  const assign: A & B = Object.assign(new A(), new B())
  // 联合类型
  const empty: null | undefined | string = null
  const fn = (n): A | B => n < 0.5 ? new A() : new B()
  fn(1).toString // 联合类型访问属性 只能访问共有属性
  // 联合类型 所来带的问题 有些时候我们需要进一步的缩小类型的范围
  const b = fn(1)
  if ((b as B).b) { // 1.使用类型断言 （很繁琐 内部还需要使用 不通用）
    (b as B).b()
  }
  function isB(a: any): a is B { // 2.自定义类型保护 必须返回一个类型谓词 这里是 s is B
    return (a as B).b !== undefined
  }
  if (isB(b)) { b.b() }
  if (b instanceof B) { b.b() } // 3.内置的类型保护 (instanceof typeof)
  if (typeof empty === string) { empty.length }
  const strnull: string = null // 类型检查器认为 null 与 undefined可以赋值给任何类型
  strnull!.charAt(0) // !表 从类型中排除unll和undefined
  // 类型别名 类型别名不能被 extends 和 implements 而接口可以
  type G<T> = { val: T }
  // 字符串字面量类型 数字字面量类型
  const strnum: 1 | '2' = '2'
  // 可辨识联合
  interface Square {
    k: 's'; // 具备普通的单例类型(特征属性)
    s: number;
  }
  interface Circle {
    k: 'c';
    r: number;
  }
  type Shape = Square | Circle
  function getPerimeter(shape: Shape): number {
    switch (shape.k) { // 特征属性上的类型保护
      case 's':
        return 4 * shape.s
      case 'c':
        return 2 * Math.PI * shape.r
    }
  }
  // this类型
  class Calculator {
    constructor(private num: number = 0) {}
    add (num: number): this {
      this.num += num
      return this
    }
  }
  new Calculator().add(1).add(2)
  // 索引类型 K extends keyof T (K类型是T类型的键的联合 T[K][]类型是数组每一项是T[K])
  function pluck<T, K extends keyof T>(obj: T, arr: K[]): T[K][] {
    return arr.map(key => obj[key])
  }
  pluck({ a: 1 }, ['a'])
  // 映射类型
  interface Person { name: string; age: number }
  type ReadOnly<T> = {
    readonly [K in keyof T]: T[K] // 在索引位置 in keyof 相当于 泛型中的 extends keyof
  }
  const p: ReadOnly<Person> = {name: '1', age: 12} // 将得到一个 基于Person接口的 只读的类型
  const pick: Pick<Person, 'name'> = {name: '1'} // ts内置的Pick映射类型 从一个现有类型中挑选出一部分作为新类型 Readonly
  // 内置的有条件类型
  type T1 = Exclude<string|number, string> // number Exclude<T, U> 从T中剔除可以赋值给U的类型
  type T2 = Extract<string, string|number> // string Extract<T, U> 提取T中可以赋值给U的类型
  type T3 = NonNullable<string|null> // string NonNullable<T> 从T中剔除null和undefined
  type T4 = ReturnType<{(): void}> // void ReturnType<T> 获取函数返回值类型
  type T5 = InstanceType<typeof C> // C InstanceType<T> 根据一个类的类型获取实例的类型
```
## 模块 和 命名空间
```typescript
  // 外部模块 -> 模块
  import d, { x } from './module' // 默认导入 按需导入
  import { x as y } from './module' // 按需导入 取别名
  import * as all from './module' // 导入所有 (默认导入 为default成员)

  export { x } // 按需导出
  export default a // 默认导出

  export { x } from './module' // 按需转发
  export { x as y } from './module' // 按需转发 取别名
  export * from './module' // 转发所有

  import './1' // 具有副作用的导入模块 用户不关注它的导出
  export = { a: 1 } // 为了支持CommonJS和AMD的exports ts提供了 export = 语法
  import obj = require('./1')

  // 注意 ts仅支持较成熟的es模块规范 不支持如下 但js可以通过babel实现支持 为了使用ts的类型检测 不建议使用
  // export d from './module' (https://github.com/tc39/proposal-export-default-from)
  // export * as all from './module' (https://github.com/tc39/proposal-export-ns-from)
  // 内部模块 -> 命名空间
  namespace A {
    export interface Asd {
      i(): void;
    }
  }
  import BB = A // 命名空间 使用 别名
  class AA implements BB.Asd {
    i() {}
  }
```
## 声明合并
```typescript
  // 接口与接口 合并 两个同名接口中声明的 非函数成员的类型必须相同 函数成员会被当函数的重载 后面的接口具有更高的优先级
  interface Box { width: number; a(a: string): string }
  interface Box { height: number; a(a: number): number }
  const box: Box = { width: 1, height: 1, a<T>(a: T) { return a } }
  box.a('1')
  // 接口与类 合并
  class Foo { x: number }
  interface Foo { y: string } // 相当于扩展 实例成员
  const foo = new Foo()
  foo.x foo.y
  // 命名空间与命名空间 合并
  namespace Animals { export class A {} }
  namespace Animals { export class B {} } // 相当于扩展
  class SubA implements Animals.A {}
  // 命名空间与类 合并
  class Album {}
  namespace Album { export const a = '' } // 相当于扩展 类的静态成员
  Album.a
  // 命名空间与函数 合并
  function fn(): void { }
  namespace fn { export const a = '' } // 相当于扩展 函数的静态成员
  fn.a
  // 命名空间与枚举 合并
  enum Col { span = 1 }
  namespace Col { export const mixCol = '2' } // 相当于扩展 属性成员 { span: 1, 1: 'span', mixCol: '2' }
```
## 声明文件 .d.ts
```typescript
  // .d.ts 声明文件 不能有具体的实现 比如函数的具体实现 和 变量的具体实现（赋值）
  // .d.ts 声明文件 可以通过 tsc 根据 .ts文件 单独生成
  export interface Foo { } // 导出类型
  export const Foo: { a: Foo } // 导出值
  import { Foo } from './module.d.ts' // 导入类型和值
  const obj: Foo = Foo.a
  declare const foo: number // 声明 全局变量的类型
  declare function fn(s: string): void // 声明 全局函数的类型
  declare namespace myLib { // 全局变量myLib 包含一个函数和一个属性
    function fn(): void;
    const n: number
  }
  // 函数重载
  declare class R {}
  declare function getWidget (s: number): R
  declare function getWidget (s: string): R[]
  // 可重用类型（接口）
  interface Obj {
    greeting: string;
    duration: number;
    color?: string;
  }
  declare function b(obj: Obj): void
  // 可重用类型（类型别名）
  type C = string | (() => void) | number
  declare function c(c: C): void
  // 组织类型 (将不同的类型组织到一起)
  declare namespace greeterLib {
    interface A { name: string }
    interface B { name: string }
  }
  declare class Greeter {
    greeting: string
    constructor(a: string)
    showGreeting(): void
  }
  // 规范
  // 回调函数里不需要指定可选参数
  interface O {
    fn(callback: (s: string, n: number) => void): void;
  }
  let o: O
  o.fn(() => {})
  // 重载与回调函数 不要因为回调函数参数个数不同而写不同的重载
  declare function beforeAll(action: (done: O) => void): void
  beforeAll(() => {})
  // 函数重载顺序 精准 放到前面
  declare function getHtml(a: HTMLDivElement): void
  declare function getHtml(a: HTMLElement): void
```
## 发布 声明文件
  1. 与你的npm包捆绑在一起
  - 使用 package.json typings | types 字段指定 主 .d.ts文件位置 然后主.d.ts中引入其他.d.ts文件
  - tsconfig.json 中设置 "declaration": true, // 生成相应的 '.d.ts' 文件
  - tsc --emitDeclarationOnly --declarationDir types // tsc命令 --emitDeclarationOnly只生成声明文件  --declarationDir types 直接设置声明文件的生成路径
  2. 在npm上发布到@types组织
## 与 Babel 合作构建流程问题 [参考](https://github.com/Microsoft/TypeScript-Babel-Starter#readme)
