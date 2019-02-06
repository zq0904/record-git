// jest 测试 必须使用 **.test.js
const {add} = require('./math')
test('测试add函数', () => {
  expect(add(1, 2)).toBe(3)
})