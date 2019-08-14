// 对目标’数字‘进行补0处理  complement(12, 2) => '12' complement(-1, 2) => '-01' complement(-1, -2) => '-1'
const complement = (number: number, length: number) => {
  const prefix = number < 0 ? '-' : ''
  const s = String(Math.abs(number))
  return prefix + '0'.repeat(length - s.length > 0 ? length - s.length : 0) + s
}

export {
  complement
}
