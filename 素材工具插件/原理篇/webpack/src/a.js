const { content } = require('./b.js')

// 对循环引用的处理
const asd = require('./a')
console.log(asd)

module.exports = `天气 是\n ${content}`
