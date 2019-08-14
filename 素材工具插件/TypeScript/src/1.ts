
// // 规范
// // 回调函数里不需要指定可选参数
// interface O {
//   fn(callback: (s: string, n: number) => void): void
// }
// let o: O
// o.fn(() => {})
// // 重载与回调函数 不要因为回调函数参数个数不同而写不同的重载
// declare function beforeAll(action: (done: O) => void): void
// beforeAll(() => {})
// // 函数重载顺序 精准 放到前面
// declare function getHtml(a: HTMLDivElement): void
// declare function getHtml(a: HTMLElement): void

// 发布
// 1.与你的npm包捆绑在一起
// 使用 package.json typings | types 字段指定 主.d.ts文件位置 然后主.d.ts中引入其他.d.ts文件

