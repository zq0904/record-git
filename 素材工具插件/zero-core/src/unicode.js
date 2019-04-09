const encode = str => {
  const arr = []
  for (const s of str) {
    arr.push(('00' + s.charCodeAt(0).toString(16)).slice(-4))
  }
  return '\\u' + arr.join('\\u')
}
const decode = str => unescape(str.replace(/\\/g, '%')) // unescape兼容safari

export {
  encode,
  decode
}
