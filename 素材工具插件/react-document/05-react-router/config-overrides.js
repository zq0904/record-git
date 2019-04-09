// https://github.com/arackaf/customize-cra
const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader() // 使用less
)