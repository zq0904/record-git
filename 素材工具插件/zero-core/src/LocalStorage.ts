import { set, get } from './Cookie'
import { getTimeStamp, Days } from './lib'

//
// setItem('a', {a:1}) // 随浏览器进程
// setItem('a', {a:1}, 10) // 存10天
// setItem('a', {a:1}, '2019-10-31') // 存到2019-10-31天
// getItem('a', {a: 1}, '2019-10-31', 2) // 权重为2
// removeItem('a')
// clear 清空所有由该方法所存储的数据

const { localStorage } = window
const COOKIESSSION = '_COOKIESSSION_TIME' // 用于记录浏览器进程
const LOCALSTORAGE = 'LOCALSTORAGE' // 用于记录 长度 最小过期时间
const PREFIX = '_lS_' // 由方法所存储的 localStorage 前缀
const config = localStorage.getItem(LOCALSTORAGE) || {
  length: 0,
  minExpiration: 0
}
console.log(config)
// 获取浏览器进程时间 是一个负数（保证 一定与用户设置的时间不同）如果上一个浏览器进程已经关闭 则产生一个新的进程时间
const getCookieSessionTime = () => {
  const time = get(COOKIESSSION)
  if (time) {
    return +time
  } else {
    const now = '-' + Date.now()
    // 这里为什么存储负数 就是保证 用户设置的时间 不可能和这个一样
    set(COOKIESSSION, now, false, '/') // 随浏览器进程
    return +now
  }
}
// 清空所有
// const removeExpired = (immediate = true) => {
//   const now = Date.now()
// }

const setItem = (name: string, val: any, days: Days | false = false, weight: 0 | 1 | 2 = 0) => {
  // 先去检测是否有过期的 有删除 后 在存储
  const item = JSON.stringify({
    v: val, // 值
    e: days === false ? getCookieSessionTime() : getTimeStamp(days), // 负数表随浏览器进程 正数表过期时间
    w: weight, // 权重
  })
  // 存储失败 应优先删除权重较低的
  localStorage.setItem(PREFIX + name, item)
}

const getItem = (name: string) => {
  const res = localStorage.getItem(PREFIX + name)
  if (res) {
    const { v, e } = JSON.parse(res)
    // 在当前浏览器进程中 || 未过期的
    if ((e < 0 && e === getCookieSessionTime()) || Date.now() < e) {
      return v
    }
    return null
  }
  return null
}

const removeItem = (name: string) => {
  localStorage.removeItem(PREFIX + name)
}

const clear = () => {
  for (const name of Object.keys(localStorage.valueOf())) {
    name.startsWith(PREFIX) && localStorage.removeItem(name)
  }
}

export {
  getItem,
  setItem,
  removeItem,
  clear,
}
