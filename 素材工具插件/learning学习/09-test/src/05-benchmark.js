// benchmark 性能测试
const Benchmark = require('benchmark')
const {fn1, fn2} = require('./math')

const arr = [{ id: '1', name: '小兰', title: 'iphone XR', price: 4999, number: 2 }]

const suite = new Benchmark.Suite()
  suite
  // .add('测试parseInt', () => fn1('123'))
  // .add('测试Number', () => fn2('123'))
  // .on('cycle', function(event) { // 每个add所有测试周期执行完输出
  //   console.log(String(event.target))
  // })
  // .on('complete', function() { // 最终执行完成将会输出
  //   console.log('执行最快的是：' + this.filter('fastest').map('name'))
  // })

  .add('测试 JSON.parse(JSON.stringify())', () => JSON.parse(JSON.stringify(arr)))
  .add('测试 slice()', () => arr.slice())
  .on('cycle', function(event) { // 每个add所有测试周期执行完输出
    console.log(String(event.target))
  })
  .on('complete', function() { // 最终执行完成将会输出
    console.log('执行最快的是：' + this.filter('fastest').map('name'))
  })

  .run({ 'async': true }) // 执行异步

  // 单位 ops/sec 性能指标 简单理解为：每秒执行操作的次数
  