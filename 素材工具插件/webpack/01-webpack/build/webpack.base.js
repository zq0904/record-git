const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: '../src/main.js', // 入口
  output: { // 出口
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [ // import 或"加载"模块时预处理文件
      // { test: /.jsx?$/, use: },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, /* 自带css模块的热更新 */
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
      { test: /\.xml$/, use: ['xml-loader'] }
    ]
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({ template: '../index.html' }),
    new CleanWebpackPlugin(['../dist'])
  ]
}
