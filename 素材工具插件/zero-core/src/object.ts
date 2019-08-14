const noop: () => void = () => {}

// 声明类型保护 (针对 Array 等 是否有必要声明？: arg is any[])
const isNull = (arg: any): arg is null => arg === null

const isUndefined = (arg: any): arg is undefined => typeof arg === 'undefined'

const isNumber = (arg: any): arg is number => typeof arg === 'number'

const isString = (arg: any): arg is string => typeof arg === 'string'

const isBoolean = (arg: any): arg is boolean => typeof arg === 'boolean'

const isArray = (arg: any) => Object.prototype.toString.call(arg) === '[object Array]'

const isObject = (arg: any) => Object.prototype.toString.call(arg) === '[object Object]'

const isFunction = (arg: any) => typeof arg === 'function'

const isDomElement = (arg: any): arg is HTMLElement => arg && arg.nodeType === 1

const isRegExp = (arg: any): arg is RegExp => Object.prototype.toString.call(arg) === '[object RegExp]'

const isDate = (arg: any): arg is Date => Object.prototype.toString.call(arg) === '[object Date]'

const isBuffer = (arg: any) => { // 只针对node环境
  if (isNull(arg) || isUndefined(arg)) return false
  return !!(arg.constructor && arg.constructor.isBuffer && arg.constructor.isBuffer(arg))
}

const extend = (...args: any[]) => {
  isObject(args[0]) ? args.unshift(false) : args[0] = !!args[0] // 统一入参
  const [deep, target, ...other] = args
  let targetVal, oVal
  for (const o of other) {
    for (const key in o) {
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
  isRegExp,
  isDate,
  isBuffer,
  extend
}
