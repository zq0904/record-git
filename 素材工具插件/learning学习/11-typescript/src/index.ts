// ts 是一门语言 是js的超级

// number
let n1: number = 1
let n2: number = NaN
let n3: number = Infinity
let n4: number = 0xA12 // 16进制
let n5: number = 0b10 // 2进制
let n6: number = 0o10 // 8进制
// string
let s1: string = '1'
let s2: string = "1"
let s3: string = `1${n1}`
// boolean
let b1: boolean = true
let b2: boolean = false
// 数组
let arr1: Array<number> = [1, 2]
let arr2: number[] = [1, 2]
// 元组 (tuple) 对数组项的 个数 和 类型都有限定
let tuple1: [string, number] = ['1', 1]
tuple1[1] = 2 // tuple1[2] = 2 将报错
// void
let v: void = undefined
// undefined
let u: undefined = undefined
// null
let n: null = null
// any
let a: any = 1
a = '123'
a = []
// never 死循环函数 抛出错误函数
function fn1():never {
  throw new Error('出错了')
  // while (true) {}
}
// object类型 只要是引用类型就行
let o1: object = {}
let o2: object = []
let o3: object = () => {}
let o4: object = new Date()
let o5: object = class A {}
// 对象类型
let obj: {name: string, age: number} = {name: '小兰', age: 20}
// enum 枚举类型 （为了表意）
enum Gender {
  male = 1,
  female = 0,
  unknown = -1
}
let g: Gender = Gender.male // 等价于 let g = 1

// 类型断言
let sss: any = 123
sss = '123'
let nnn: number = (<string>sss).length // 明确告诉ts sss在这里就是string 来解决一些判断错误类型
 
// ts中的类
// 1.使用属性 必须声明 声明指定类型 要么给个默认值 要么在构造方法中赋值
// 2.访问修饰符 不加默认就是 public公开  private私有(只能在该类中使用)  protected受保护的(只能在该类及子类中使用)
// 3.readonly 只读属性 不能修改
class A {
  public name: string
  readonly info: object = {z: '很重要的信息'}
  private age: number = 10 // 指定默认值
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  protected hellow() {
    console.log(this.name)
  }
  printAge() {
    console.log(this.age)
  }
}

class B extends A { // 继承和Es6没区别
  gender: number = 0
  constructor(name: string, age: number, gender: number) {
    super(name, age)
    this.gender = gender
  }
  hi() {
    this.hellow()
  }
}
const b = new B('小兰', 18, 0)
b.hi()
console.log(b.info)

// 4.缩写 等同于 每次声明属性 还要在构造方法中 this.xxx = xxx
class C {
  constructor(public name: string) { }
}
console.log( new C('小齐').name )

// 类的存取器结合私有属性
class P {
  private _name: string = ''
  get name():string {
    return this._name
  }
  set name(value: string) {
    if (value.length > 3) throw new Error('姓名长度不能超过3位')
    this._name = value
  }
}
const p = new P()
p.name = '宇小光'
console.log(p.name)

// interface 接口
interface AjaxOption {
  url: string
  type?: string // ?代表可选属性
  success: (data: object) => void // 函数
  error(err: object): void // 函数
  readonly info: string // 只读属性
  [other: string]: any // 额外属性检测 (解决多余的入参于接口不匹配问题)
}

function ajax(obj: AjaxOption) {
  // obj.info = '123'
}
ajax({
  url: '',
  success() {},
  error() {},
  info: '123',
  aaa: {} // 多余的入参
})

// 函数类型的接口
interface FnInterface {
  (a: number, b: number): number
}
let fn2:FnInterface = function(c: number, d: number): number {
  return c + d
}
// 类类型的接口
interface ClassInterface {
  name: string
  hi(): void
}
class People implements ClassInterface {
  name: string = '1'
  hi() {}
}
// 接口的继承
// 1.接口继承接口
interface Point1 {
  x: number
  y: number
}
interface Point2 {
  z: number
}
interface Point3 extends Point1, Point2 {} // 接口可以实现多继承 类不可以
let point3: Point3 = {
  x: 1,
  y: 2,
  z: 3
}
// 2.接口继承类 不会继承属性的具体实现 仅仅是属性的类型 包括访问修饰符
class CC {
  name: string = ''
  hi(): void {}
}
interface In extends CC {}
let oo: In = {
  name: '小兰',
  hi() {}
}
