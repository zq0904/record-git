import Observer from './Observer.js'
import Compile from './Compile.js'

class Vue {
  constructor({ el, data, methods } = {}) {
    this.$el = el
    this.$data = data
    this.$methods = methods
    new Observer(this.$data)
    new Compile(this)
    this.proxy(this.$methods)
    this.proxy(this.$data)
  }
  // 代理到vm实例上
  proxy = obj => {
    for (const key of Object.keys(obj)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() { return obj[key] },
        set(val) { obj[key] = val }
      })
    }
  }
}

export default Vue
