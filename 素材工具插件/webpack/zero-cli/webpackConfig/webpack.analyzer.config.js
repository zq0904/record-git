const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const prdConfig = require('./webpack.prd.config')
const devConfig = require('./webpack.dev.config')

const isPrd = process.env.NODE_ENV === 'production'

module.exports = merge(
  isPrd ? prdConfig : devConfig,
  {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
)
