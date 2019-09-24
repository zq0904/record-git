import Dep from './Dep.js'
import { getValByExp } from './util.js'

// 关联 Compile 与 Observer
class Watcher {
  constructor(vm, exp, cb) {
    this.$vm = vm
    this.exp = exp
    this.cb = cb
    Dep.nowWatcher = this
    this.oldVal = getValByExp(this.$vm.$data, this.exp) // Compile初始编译时 new Watch 内部获取老值 会触发get 添加进相应队列
    Dep.nowWatcher = null
  }
  update = () => {
    const newVal = getValByExp(this.$vm.$data, this.exp)
    if (newVal === this.oldVal) return
    this.cb && this.cb.call(this.$vm, newVal, this.oldVal)
    this.oldVal = newVal
  }
}

export default Watcher
