import Observer from './observer.js'
import Compile from './compile.js'
import { log } from './util.js'

class Vue {
  constructor({ el, data, methods } = {}) {
    this.$el = el
    this.$data = data
    this.$methods = methods
    new Observer(this.$data)
    new Compile(this)
  }
}

export default Vue
