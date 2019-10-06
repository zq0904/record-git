// 参考 https://www.jianshu.com/p/273e1c9904d2
// 事件订阅发布模式在tapable中的实现
class SyncHook {
  constructor(arg) {
    this.length = Array.isArray(arg) ? arg.length : 0
    this.tasks = []
  }
  // 注册/订阅 事件
  tap(name, fn) {
    this.tasks.push(fn)
  }
  // 调用/发布 事件
  call(...agrs) {
    const actualAgr = agrs.splice(0, this.length)
    for (const fn of this.tasks) {
      fn && fn(...actualAgr)
    }
  }
}

class SyncBailHook {
  constructor(arg) {
    this.length = Array.isArray(arg) ? arg.length : 0
    this.tasks = []
  }
  tap(name, fn) {
    this.tasks.push(fn)
  }
  call(...agrs) {
    const actualAgr = agrs.splice(0, this.length)
    for (const fn of this.tasks) {
      if (fn(...actualAgr) !== undefined) break
    }
  }
}

class AsyncParallelHook {
  constructor(arg) {
    this.length = Array.isArray(arg) ? arg.length : 0
    this.tasks = []
  }
  tapAsync(name, fn) {
    this.tasks.push(fn)
  }
  callAsync(...agrs) {
    const finalCallback = agrs.pop()
    const actualAgr = agrs.splice(0, this.length)
    let i = 0
    const done = () => {
      i++
      if (i >= this.tasks.length) {
        finalCallback()
      }
    }
    for (const fn of this.tasks) {
      fn(...actualAgr, done)
    }
  }
}

class AsyncSeriesHook {
  constructor(arg) {
    this.length = Array.isArray(arg) ? arg.length : 0
    this.tasks = []
  }
  tapAsync(name, fn) {
    this.tasks.push(fn)
  }
  callAsync(...args) {
    const finalCallback = args.pop()
    const actualAgr = args.splice(0, this.length)
    let i = 0
    const next = () => {
      i++
      this.tasks[i] && this.tasks[i](...actualAgr, next)
      if (i >= this.tasks.length) finalCallback()
    }
    this.tasks[i] && this.tasks[i](...actualAgr, next)
  }
}

module.exports = {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook
}
