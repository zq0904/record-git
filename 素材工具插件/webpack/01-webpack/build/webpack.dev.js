const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  plugins: [ // 插件
    new webpack.HotModuleReplacementPlugin() // webpack-merge的合并策略没有问题
  ]
})
