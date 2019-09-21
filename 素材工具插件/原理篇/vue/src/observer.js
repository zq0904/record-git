import Dep from './Dep.js'

// 对数据 做递归劫持 每当有数据改变的时候 通知所有watcher去更新视图
class Observer {
  constructor($data) {
    this.$data = $data
    this.hijacked(this.$data)
  }
  hijacked = obj => {
    if (!(obj instanceof Object)) return
    for (const key of Object.keys(obj)) {
      this.defineProperty(obj, key, obj[key])
    }
  }
  defineProperty = (obj, key, val) => {
    const that = this
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        dep.subscribe() // 内部做了处理 只有由于new Watcher 才会添加订阅
        return val
      },
      set (value) {
        val = value
        that.hijacked(value)
        dep.release()
      }
    })
    this.hijacked(val)
  }
}

export default Observer
