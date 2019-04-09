const random = (min, max) => { // 生成一个包含 min max 的随机整数
  if (max < min)[min, max] = [max, min]
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

export {
  random
}
