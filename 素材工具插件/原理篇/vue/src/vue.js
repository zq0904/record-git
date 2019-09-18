import Compile from './compile.js'
import { log } from './util.js'

class Vue {
  constructor({ el, data, methods } = {}) {
    this.$el = el
    this.$data = data
    this.$methods = methods
    new Compile(this)
  }
}

export default Vue
