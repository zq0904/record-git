// https://github.com/arackaf/customize-cra
const { override, addDecoratorsLegacy, addWebpackAlias, useEslintRc } = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(), // 支持装饰器语法
  useEslintRc() // 使用.eslintrc配置文件 而不是使用配置CRA自带的配置文件
)