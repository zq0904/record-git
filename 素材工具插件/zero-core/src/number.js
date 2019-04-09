// 对目标’数字‘进行补0处理  complement('a', 2) => 'a'  complement('-1', 2) => '-01'
const complement = (number, length) => {
  if (isNaN(number - 0)) return number
  const prefix = number < 0 ? '-' : ''
  const s = String(Math.abs(number))
  return prefix + '0'.repeat(length - s.length > 0 ? length - s.length : 0) + s
}

export {
  complement
}
