// https://github.com/arackaf/customize-cra
const {
  override,
  addWebpackResolve,
  addWebpackModuleRule,
  addDecoratorsLegacy,
  useEslintRc,
} = require('customize-cra')
const path = require('path')

console.log(path.resolve(__dirname, 'src'))

module.exports = override(
  addWebpackResolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 省略后缀
    alias: { // 别名
      '@': path.resolve(__dirname, 'src'),
    }
  }),
  addWebpackModuleRule({
    test: /\.(j|t)sx?$/,
    exclude: /(node_modules|bower_components)/,
    use: { loader: 'babel-loader' }
  }),
  addDecoratorsLegacy(), // 支持装饰器语法 确保已经安装了@babel/plugin-proposal-decorators
  useEslintRc(), // 使用.eslintrc配置文件 而不是使用配置CRA自带的配置文件
)