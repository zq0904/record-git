import fn, {a, b} from './a.js'
import Vue from 'vue'
import $ from './b.js'
// require('./b.js') // 主模块中使用cjs不会被编译 其他模块可以被编译(任意使用)

fn()
console.log(a, b, Vue)