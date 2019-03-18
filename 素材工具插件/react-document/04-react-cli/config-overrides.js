const { override, addDecoratorsLegacy, disableEsLint } = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint()
)
// react-scripts 升级导致 一个天坑 建议目前使用 2.0.5版本