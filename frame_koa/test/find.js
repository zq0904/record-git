const fse = require('fs-extra')
const path = require('path')

/**
 * 检索 一个目录下 包含某个目录的全部地址
 * @param {*} dirPath 
 * @param {*} arr 
 * @param {*} arr 
 */
const getDirPath = (dirPath, arr = []) => {
  const names = fse.readdirSync(dirPath)
  for (const name of names) {
    const namePath = path.resolve(dirPath, name)
    const stat = fse.statSync(namePath)
    if (stat.isDirectory()) {
      if (name === 'node_modules') {
        arr.push(namePath)
      } else {
        getDirPath(namePath, arr)
      }
    }
  }
  return arr
}

console.log(getDirPath(process.cwd()))
