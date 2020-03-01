const path = require('path')

module.exports = {
  mode: 'production',
  entry: ['core-js', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
    ]
  },
  optimization: {
    minimize: false // 不压缩 方便看结果
  },
}
