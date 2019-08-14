// 随机生成一个包含 min max 的整数
const random = (min: number, max: number) => {
  if (max < min) [min, max] = [max, min]
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

export {
  random
}
