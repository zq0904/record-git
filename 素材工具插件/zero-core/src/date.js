import { isDate, isNumber, isString } from './object.js'
import { complement } from './number.js'

const format = (...args) => { // format(new Date().getTime(), 'YYYY-MM-DD a hh:mm:ss')
  const d = isDate(args[0]) ? (
    args[0]
  ) : (
    isNumber(args[0]) ? new Date(args[0]) : new Date()
  )
  let f = args.pop()
  const c = complement
  const map = {
    'YYYY': d.getFullYear(), // 年
    'YY': d.getFullYear().toString().substr(2), // 年
    'MM': c(d.getMonth() + 1, 2), // 月
    'M': d.getMonth() + 1, // 月
    'DD': c(d.getDate(), 2), // 日
    'D': d.getDate(), // 日
    'HH': c(d.getHours(), 2), // 24时
    'H': d.getHours(), // 24时
    'hh': c(d.getHours() % 12, 2), // 12时
    'h': d.getHours() % 12, // 12时
    'mm': c(d.getMinutes(), 2), // 分
    'm': d.getMinutes(), // 分
    'ss': c(d.getSeconds(), 2), // 秒
    's': d.getSeconds(), // 秒
    'a': d.getHours() <= 12 ? 'AM' : 'PM' // 上下午
  }
  for (let reg in map) f = f.replace(new RegExp(reg, 'g'), map[reg])
  return f
}
// 计算时间相差默认毫秒级 支持时间戳 字符串 date对象
const timeDiff = (start, end, format = 'ms') => { // timeDiff('2018/01/01', '2018/01/02 13:00:00', 'H') => 37
  const _conversion = t => {
    if (isNumber(t)) return t
    if (isDate(t)) return t.getTime()
    if (isString(t)) return new Date(t)
  }
  let diff
  switch (format) {
    case 'Y':
      diff = 1000 * 3600 * 24 * 365
      break
    case 'M':
      diff = 1000 * 3600 * 24 * 31
      break
    case 'D':
      diff = 1000 * 3600 * 24
      break
    case 'H':
      diff = 1000 * 3600
      break
    case 'm':
      diff = 1000 * 60
      break
    case 's':
      diff = 1000
      break
    case 'ms': default:
      diff = 1
      break
  }
  return Math.floor(Math.abs(_conversion(start) - _conversion(end)) / diff)
}

export {
  format,
  timeDiff
}
