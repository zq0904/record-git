exports.add = (...args) => args.reduce((b, a) => (b + a), 0)
exports.multiplication = (...args) => args.reduce((b, a) => b * a, 1)
exports.cover = (a, b) => { // 覆盖率测试
  if (a > b) return a
  else if (a < b) return b
  else return 0
}
// 性能测试
exports.fn1 = arg => parseInt(arg)
exports.fn2 = arg => Number(arg)
