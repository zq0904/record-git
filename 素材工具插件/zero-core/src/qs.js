import { isObject, isString, extend } from './object.js'

const stringify = (o, b = '') => { // {a: 1, b: {c: 'c', d: {e: 'e',r: {a: 1}}}, c: 3} => 'a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3'
  if (!isObject(o)) return
  return Object.keys(o).map(k => {
    const val = o[k]
    const key = b ? `${b}[${k}]` : k
    return isObject(val) ? (
      stringify(val, key)
    ) : (
      encodeURIComponent(key) + '=' + encodeURIComponent(val)
    )
  }).join('&')
}
const parse = str => { // str = 'a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3' => {a: '1', b: {c: 'c', d: {e: 'e',r: {a: '1'}}}, c: '3'}
  if (!isString(str)) return
  return decodeURIComponent(str).split('&').reduce((before, v) => {
    const [key, val] = v.split('=') // ['a', '1'] ['b[c][d]', 'c']
    const o = {}
    const arr = key.replace(/^(.+?)(\[.+)\]$/, '$1]$2').split('][') // ["a"] ["b", "c", "d"]
    arr.reduce((b, a, i) => {
      return b[a] = i === arr.length - 1 ? val : {}
    }, o)
    return extend(true, before, o)
  }, {})
}
const get = (str = window.location.search.substr(1)) => { // '.com?a=1&b=2' '?a=1&b=2' 'a=1&b=2'   ''  'key'
  const s = str.replace(/^.*?\?(.*)$/, '$1') // 'a=1&b=2' 'key'
  return s.includes('=') ? parse(s) : parse(window.location.search.substr(1))[s]
}

export {
  stringify,
  parse,
  get
}
