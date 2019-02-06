// istanbul 覆盖率的测试
// Statements 语句覆盖率  语句
// Branches   分支覆盖率  if代码块
// Functions  函数覆盖率  函数都调用
// Lines      行覆盖率    每一行都执行
const {add, multiplication, cover} = require('./math.js')
add(1, 2, 3)
multiplication(3, 3)
cover(1, 2)
cover(2, 2)
cover(2, 1)