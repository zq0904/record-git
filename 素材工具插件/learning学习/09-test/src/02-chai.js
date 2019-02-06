// 通过chaijs断言库 进行测试
const {assert, expect, should} = require('chai')
const bar = 1
const arr = [1, 2, 3]

assert.typeOf(bar, 'number', '变量bar 类型不是 Number')
assert.equal(bar, 1, '变量bar 不等于 1')
assert.lengthOf(arr, 3, 'arr.length 不等于 3')

expect(bar).to.be.a('number') // expected 1 to be a number
expect(bar).to.equal(1) // expected 1 to equal 1
expect(arr).to.have.lengthOf(3) // expected [ 1, 2, 3 ] to have a length of 3 but got 3

should() // 必须先调用下
bar.should.be.a('number') // expected 1 to be a number
bar.should.be.equal(1) // expected 1 to equal 1
arr.should.have.lengthOf(3) // expected [ 1, 2, 3 ] to have a length of 3 but got 3