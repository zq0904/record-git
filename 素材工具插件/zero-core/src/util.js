const throttle = (fn, time) => { // 节流
  let after = -Infinity
  let timeId = null
  return () => {
    const _perform = () => {
      after = Date.now()
      fn && fn()
    }
    const c = Date.now() - after
    if (c > time) { // 首次 或者 大于
      _perform()
    } else {
      clearTimeout(timeId)
      timeId = setTimeout(_perform, time - c)
    }
  }
}
const debounce = (fn, time) => { // 防抖
  let timeId = null
  return () => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      fn && fn()
    }, time)
  }
}

export {
  throttle,
  debounce
}
