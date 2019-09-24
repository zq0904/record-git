const path = require('path')

const projectPath = process.cwd()
const packagePath = path.resolve(__dirname, '../')

module.exports = {
  path: {
    projectPath,
    packagePath,
  }
}