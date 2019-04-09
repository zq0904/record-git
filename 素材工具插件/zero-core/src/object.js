const noop = () => {}
const isNull = arg => arg === null
const isUndefined = arg => typeof arg === 'undefined'
const isNumber = arg => typeof arg === 'number'
const isString = arg => typeof arg === 'string'
const isBoolean = arg => typeof arg === 'boolean'
const isArray = arg => Object.prototype.toString.call(arg) === '[object Array]'
const isObject = arg => Object.prototype.toString.call(arg) === '[object Object]'
const isFunction = arg => typeof arg === 'function'
const isDomElement = arg => arg && arg.nodeType === 1
const isJqElement = arg => { // 只针对浏览器全局jq
  const $ = (window && window.$) || false
  return $ && arg instanceof $
}
const isRegExp = arg => Object.prototype.toString.call(arg) === '[object RegExp]'
const isDate = arg => Object.prototype.toString.call(arg) === '[object Date]'
const isBuffer = arg => { // 只针对node环境
  if (isNull(arg) || isUndefined(arg)) return false
  return !!(arg.constructor && arg.constructor.isBuffer && arg.constructor.isBuffer(arg))
}
const extend = (...args) => {
  isObject(args[0]) ? args.unshift(false) : args[0] = !!args[0] // 统一入参
  const [deep, target, ...other] = args
  let targetVal, oVal
  for (let o of other) {
    for (let key in o) {
      targetVal = target[key]
      oVal = o[key]
      // 深拷贝 且 配置项是对象或数组
      if (deep && (isObject(oVal) || isArray(oVal))) {
        // 目标对象不是对象或者数组 应直接替换  等效替代为深拷贝  {a: '123'} {a: {...}} => {a: {}} {a: {...}}
        targetVal = isArray(oVal) ? (
          isArray(targetVal) ? targetVal : []
        ) : (
          isObject(targetVal) ? targetVal : {}
        )
        target[key] = extend(deep, targetVal, oVal)
      } else if (!isUndefined(oVal)) {
        target[key] = oVal
      }
    }
  }
  targetVal = oVal = null
  return target
}

export {
  noop,
  isNull,
  isUndefined,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isDomElement,
  isJqElement,
  isRegExp,
  isDate,
  isBuffer,
  extend
}
