// E6 模块导入
import a, { numToWord } from './ref.js'
a()
numToWord(1)
// CommonJS 模块导入
const ref = require('./ref.js')
ref.numToWord(2)
// AMD 模块导入
require(['./ref.js'], function(Module) {
  Module.numToWord(3)
})
