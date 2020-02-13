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
    rules: [ // rules 规则是双倒序
      {
        // enforce: 'pre', // 可以理解为默认都是'post'优先级最低 pre优先级高于post
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
