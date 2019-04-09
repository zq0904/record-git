import { isNumber, isDate, isString } from './object.js'

const set = (name, val, days = false, path, domain, secure) => {
  let expires
  if (isNumber(days)) {
    const date = new Date()
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * days)
    expires = date.toUTCString()
  } else if (isDate(days)) {
    expires = days.toUTCString()
  } else if (isString(days)) {
    expires = new Date(days.replace(/-/g, '/')).toUTCString() // 兼容ios
  } else {
    expires = false
  }
  document.cookie = name + '=' + encodeURIComponent(val) +
    (expires ? (';expires=' + expires) : '') +
    (path ? (';path=' + path) : '') +
    (domain ? (';domain=' + domain) : '') +
    (secure ? ';secure' : '')
}
const get = name => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? decodeURIComponent(arr[2]) : null
}
const del = name => {
  if (get(name) !== null) {
    set(name, '', -1)
  }
}

export {
  set,
  get,
  del
}
