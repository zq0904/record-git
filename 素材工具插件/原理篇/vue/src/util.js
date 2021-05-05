export const log = msg => {
  throw new Error(msg)
}
export const isTextNode = node => node.nodeType === 3
export const isElNode = node => node.nodeType === 1
export const toArray = linkArray => [].slice.call(linkArray)
export const isInstruction = attrName => attrName.startsWith('v-')
export const isEventInstruction = attrName => attrName.startsWith('@') || attrName.startsWith('v-on:')
// 通过exp获取$date中的值
export const getValByExp = ($date, exp) => {
  if (!exp.includes('.')) return $date[exp]
  let res = $date
  for (const v of exp.split('.')) {
    res = res[v]
  }
  return res
}
// 通过exp设置$date中的值
export const setValByExp = ($date, exp, value) => {
  if (!exp.includes('.')) return $date[exp] = value
  const arr = exp.split(',')
  const lastItem = arr.pop()
  let med = $date
  for (const v of arr) {
    med = med[v]
  }
  med[lastItem] = value
}