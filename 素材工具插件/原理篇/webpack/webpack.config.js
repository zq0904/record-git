const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('./mock-plugin/html-webpack-plugin')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.sass'] // 省略后缀
  },
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: './mock-loader/1.js',
            options: {
              name: '明天'
            }
          },
          './mock-loader/2.js'
        ]
      },
      {
        test: /\.js$/,
        use: './mock-loader/3.js'
      },
      {
        test: /\.js$/,
        use: {
          loader: './mock-loader/4.js',
          options: {
            name: '昨天'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
