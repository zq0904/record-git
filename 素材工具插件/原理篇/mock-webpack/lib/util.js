const path = require('path')

const log = msg => {
  throw new Error(msg)
}
const isIncludesSuffix = path => /\.([^\/]+)$/.test(path)
const projectPath = process.cwd()
const packagePath = path.resolve(__dirname, '../')

module.exports = {
  log,
  isIncludesSuffix,
  path: {
    projectPath,
    packagePath,
  },
}
