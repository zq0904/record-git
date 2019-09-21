import Dep from './Dep.js'
import { getValByExp } from './util.js'

// 关联 Compile 与 Observer
class Watcher {
  constructor($data, exp, cb) {
    this.$data = $data
    this.exp = exp
    this.cb = cb
    Dep.nowWatcher = this
    this.oldVal = getValByExp(this.$data, this.exp)
    Dep.nowWatcher = null
  }
  update = () => {
    const newVal = getValByExp(this.$data, this.exp)
    this.cb(newVal, this.oldVal)
  }
}

export default Watcher
