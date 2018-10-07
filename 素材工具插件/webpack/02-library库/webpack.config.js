// 遗留问题
// 1. C3前缀如何配置 npm i -D postcss-loader autoprefixer postcss-import postcss-url
// 2. require.context() 不好使 报错误 未定义
// 3. babel-polyfill 只在入口文件main.js中 import 报错

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WorkboxPlugin = require('workbox-webpack-plugin') // 工作箱 脱机仍可用
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: { // 出口
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:7].js',
    pathinfo: false
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'], // 省略后缀
    alias: { // 别名
      '@': path.join(__dirname, 'src')
    },
    symlinks: false,
    cacheWithContext: false
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.jsx?$/, include: path.resolve(__dirname, 'src'), use: { loader: 'babel-loader', options: { presets: ['env'] } } },
      { test: /\.css$/, use: ['style-loader', 'css-loader', { loader: 'postcss-loader', options: { config: {path: 'postcss.config.js'} } }] }, /* 自带css模块的热更新 */
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  },
  plugins: [ // 插件
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ _: 'lodash' }), // 提供 可以不写 import _ from 'loadsh' 直接使用 _
    new WorkboxPlugin.GenerateSW({ // 脱机仍可用
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}

