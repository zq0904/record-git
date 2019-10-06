// const {
//   SyncHook,
//   SyncBailHook,
//   AsyncParallelHook,
//   AsyncSeriesHook
// } = require('tapable')
const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook
} = require('./mock-tapable')

// tapable 是一个 事件订阅发布模式
// 于 vue 中 watcher + dep 异曲同工
// webpack中 每个插件 都在订阅 不同的生命周期钩子
// webpack主流程编译的过程中会发布相应的生命周期钩子 对应某些插件谁订阅了 谁就执行

class Compile {
  constructor() {
    this.config = {
      entry: './src/index.js'
    }
    this.hooks = {
      beforeAnalyse: new SyncHook(['complie']), // 每new一个就会产生一个事件队列 参数为Array<string> 表形参名字任意 但是这个参数没有 你订阅的回调中是接受不到参数的
      afterAnalyse: new SyncBailHook(['name']),
      beforeEmit: new AsyncParallelHook(['name']),
      afterEmit: new AsyncSeriesHook(['name'])
    }
  }
  start() {
    // 调用事件 发布事件 -> 每个订阅了的插件中的钩子都会同步执行
    this.hooks.beforeAnalyse.call('complie') // SyncHook钩子 1.主流程同步 2.订阅了这个钩子的每个tap回调也是同步的
    console.log('analyse环节')
    this.hooks.afterAnalyse.call('小明') // SyncBailHook钩子 1.主流程同步 2.订阅了这个钩子的每个tap回调也是同步的 3.订阅了这个钩子的每个tap回调中如果返回了非undefined值会直接跳过剩下未执行tap回调
    // AsyncParallelHook钩子 1.主流程到这是异步的 2.订阅了这个钩子的每个tap回调也是异步的 3.每个tap回调在不传递参数的情况下 都调用了done方法才会执行 最终的回调
    this.hooks.beforeEmit.callAsync('小红', () => {
      console.log('beforeEmit 的所有 AsyncParallelHook 都执行完成了')
    })
    console.log('emit环节')
    console.time()
    // AsyncSeriesHook 1.主流程到这是异步的 2.订阅了这个钩子的每个tap回调也是同步的
    this.hooks.afterEmit.callAsync('小兰', () => {
      console.log('afterEmit 的所有 AsyncSeriesHook 都执行完成了')
    })
  }
}

const compile = new Compile()

// 在每个webpack内部插件 去 注册事件 订阅事件
compile.hooks.beforeAnalyse.tap('beforeAnalyse', complie => {
  console.log('SyncHook', 1, complie)
})
compile.hooks.beforeAnalyse.tap('beforeAnalyse', complie => {
  console.log('SyncHook', 2, complie)
})
compile.hooks.afterAnalyse.tap('afterAnalyse', complie => {
  console.log('SyncBailHook', 1, complie)
  return 1
})
compile.hooks.afterAnalyse.tap('afterAnalyse', complie => {
  console.log('SyncBailHook', 2, complie)
})
compile.hooks.beforeEmit.tapAsync('beforeEmit', (name, done) => {
  setTimeout(() => {
    console.log(name)
    done()
  }, 1000)
})
compile.hooks.beforeEmit.tapAsync('beforeEmit', (name, done) => {
  setTimeout(() => {
    console.log(name)
    done()
  }, 2000)
})
compile.hooks.afterEmit.tapAsync('afterEmit', (name, next) => {
  setTimeout(() => {
    console.log(name)
    next()
  }, 1000)
})
compile.hooks.afterEmit.tapAsync('afterEmit', (name, next) => {
  setTimeout(() => {
    console.log(name)
    console.timeEnd()
    next()
  }, 1000)
})

compile.start()
