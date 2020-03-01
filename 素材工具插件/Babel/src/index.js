// import 'core-js'
// import './a'

[1, 2, 3].map(e => console.log(e))
const a = {}
let b = 1
console.log('[].includes("1") =>', [].includes('1'))
console.log(`Object.keys({ a: 1, b: 2 }) =>`, Object.keys({ a: 1, b: 2 }))

function zzzqqq(d) { return d.default; }
console.log('zzzqqq({default: 1}) =>', zzzqqq({ default: 1 }))

// 测试async Promise
const t = async () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 1000)
})
t().then(res => {
  console.log('测试async Promise 等 =>', res)
})
