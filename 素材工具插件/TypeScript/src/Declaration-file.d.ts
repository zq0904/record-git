// declare const foo: number // 声明 全局变量的类型

// declare function a(a: string): void // 声明 全局函数的类型

// // 使用declare namespace描述 用点表示法访问的类型或值
// declare namespace myLib { // 全局变量myLib 包含一个函数和一个属性
//   function fn(): void;
//   const n: number
// }

// // 函数重载
// declare class R {}
// declare function getWidget (s: number): R
// declare function getWidget (s: string): R[]

// // 可重用类型（接口）
// interface Obj {
//   greeting: string,
//   duration: number,
//   color?: string
// }
// declare function b(obj: Obj): void

// // 可重用类型（类型别名）
// type C = string | (() => void) | number
// declare function c(c: C): void
// // 组织类型 (将不同的类型组织到一起)
// declare namespace greeterLib {
//   interface A { name: string }
//   interface B { name: string }
// }
// declare class Greeter {
//   greeting: string
//   constructor(a: string)
//   showGreeting(): void
// }

// export interface Foo { } // 导出类型
// export const Foo: { a: Foo } // 导出值
// import { Foo } from './module.d.ts' // 导入类型和值
// const obj: Foo = Foo.a

// 在.d.ts文件中 不能有具体的实现 比如函数的具体实现 和 变量的具体实现（赋值）