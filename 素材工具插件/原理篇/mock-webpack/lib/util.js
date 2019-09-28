const path = require('path')

const log = msg => {
  throw new Error(msg)
}
// 对 \n\r " 转义
const escape = str => {
  return str.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\"/g, '\\"')
}
const isRelativeModule = path => /^\/|\./.test(path)
const isIncludesSuffix = path => /\.([^\/]+)$/.test(path)
const isArray = arg => Object.prototype.toString.call(arg) === '[object Array]'
const isObject = arg => Object.prototype.toString.call(arg) === '[object Object]'
const isString = arg => typeof arg === 'string'
const projectPath = process.cwd()
const packagePath = path.resolve(__dirname, '../')

module.exports = {
  log,
  escape,
  isRelativeModule,
  isIncludesSuffix,
  isArray,
  isObject,
  isString,
  path: {
    projectPath,
    packagePath,
  },
}
