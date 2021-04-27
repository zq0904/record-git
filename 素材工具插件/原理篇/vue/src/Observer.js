import Dep from './Dep.js'

// 对数据做递归劫持
// 数据的每个key 只new了一个dep队列
// Compile初始编译时 new Watch 内部获取老值 会触发get 添加进相应队列
// 每当有数据改变的时候 执行相应队列中的所有哦watch update方法 来触发视图更新
class Observer {
  constructor($data) {
    this.$data = $data
    this.hijacked(this.$data)
  }
  hijacked = obj => {
    if (!(obj instanceof Object)) return
    for (const key of Object.keys(obj)) {
      this.defineReactive(obj, key, obj[key])
    }
  }
  defineReactive = (obj, key, val) => {
    const that = this
    const dep = new Dep() // 真对于每个
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        dep.subscribe() // 内部做了处理 只有由于new Watcher 才会添加订阅
        return val
      },
      set (value) {
        if (value === val) return // 数据没有变化
        val = value
        that.hijacked(value)
        dep.release()
      }
    })
    this.hijacked(val)
  }
}

export default Observer
