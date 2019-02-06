// mocha 可以结合任意的assert库 这里以node assert为例
const assert = require('assert')
const bar = 1
const arr = [1, 2, 3]

describe('array', function() {
  describe('#length', function() {
    it.skip('测试 bar === 2 (这个测试将被跳过)', () => assert.equal(bar, 2))
    it('测试 arr.length === 3', () => assert.equal(arr.length, 3))
  })
})