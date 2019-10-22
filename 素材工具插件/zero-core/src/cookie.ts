import { isNumber, isDate, isString } from './Object'

type Days = number | Date | string | boolean

const set = (name: string, val: string, days: Days = false, path?: string, domain?: string, secure?: string) => {
  let expires: string | boolean
  if (isNumber(days)) {
    const date = new Date()
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * days)
    expires = date.toUTCString()
  } else if (isDate(days)) {
    expires = days.toUTCString()
  } else if (isString(days)) {
    expires = new Date(days.replace(/-/g, '/')).toUTCString() // 兼容ios
  } else {
    expires = false // 过期时间为 会话过期浏览器完全关闭
  }
  document.cookie = name + '=' + encodeURIComponent(val) +
    (expires ? (';expires=' + expires) : '') +
    (path ? (';path=' + path) : '') +
    (domain ? (';domain=' + domain) : '') +
    (secure ? ';secure' : '')
}

const get = (name: string) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? decodeURIComponent(arr[2]) : null
}

const del = (name: string) => {
  if (get(name) !== null) {
    set(name, '', -1)
  }
}

export {
  set,
  get,
  del,
}
