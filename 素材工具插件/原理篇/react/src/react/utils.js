export const isString = arg => typeof arg === 'string'

export const isObject = arg => Object.prototype.toString.call(arg) === '[object Object]'

export const isArray = arg => Array.isArray(arg)
