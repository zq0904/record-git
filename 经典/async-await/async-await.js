// const fs = require('fs');
// //封装Promise版的 读取文件
// function readFile(...a) {
//   return new Promise((resolve,reject) => {
//     fs.readFile(...a, (err,data) => {
//       if (err) {
//         reject(data);
//       }
//       resolve(data);
//     } )
//   })
// }

// readFile('./文件/a.txt','utf8')
// .then( data => {
//   console.log(data);
//   return readFile('./文件/b.txt','utf8')
//   .then( data => {
//     console.log(data);
//     return readFile('./文件/c.txt','utf8')
//     .then( data =>{
//       console.log(data);
//     } )
//   } )
// } )

//在node中提供了一个工具函数 专门用来把callback形式的API自动包装成promise的方法
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
// readFile('./文件/a.txt','utf8')
// .then( data => {
//   console.log(data);
//   readFile('./文件/b.txt','utf8')
//   .then( data => {
//     console.log(data);
//     readFile('./文件/c.txt','utf8')
//     .then( data => {
//       console.log(data);
//     })
//   })
// })

//任何函数前面加上 async 就变成了一个 async函数
//只有在async函数中才可以使用 await 结合 Promise 来使用同步的风格（写法）来调用异步API 本质还是异步的
async function read() { 
  console.log(2)
  const data1 = await readFile('./文件/a.txt','utf8'); 
  const data2 = await readFile('./文件/b.txt','utf8');
  const data3 = await readFile('./文件/c.txt','utf8');
  console.log(data1,data2,data3)
  return data1;
}
console.log(1)
read();
console.log(3) //async函数中 遇到 await 异步操作 方法会等待（异步有序） 但程序不会等待

// async函数中只返回Promise对象 想要获取async函数中的数据
// 1.通过 .then()来接受返回的Promise在进一步取得数据
// read().then( data => {
//   console.log(data);
// } )
// 2.通过 在另一个 async函数中的 await 来拿之前的 数据
async function f() {
  const data = await read();
  console.log(data);
}
f();
// H5新增了 fetch 请求 和 XMLHttpRequest 一模一样 只不过 fetch 请求原声支持 Promise
