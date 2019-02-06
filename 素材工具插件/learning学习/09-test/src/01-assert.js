// 通过node的内置模块 assert断言 进行测试
const assert = require('assert')
const {add, multiplication} = require('./math')

assert.equal(multiplication(1,2,3), 6, 'multiplication(1,2,3) 运行结果不等于 6')
assert.equal(add(6, 6), 11, 'multiplication(6, 6) 运行结果不等于 11')