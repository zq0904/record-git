import { isArray } from './object'

// 展平数组
const flat = (arr: any[], dep = Infinity) => {
  if (!isArray(arr)) return arr
  let newArr = arr
  for (let i = 0; i < dep; i++) {
    newArr = Array.prototype.concat(...newArr)
    if (newArr.every(v => !isArray(v))) return newArr
  }
  return newArr
}

export {
  flat
}
