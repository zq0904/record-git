const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const resolve = p => path.resolve(__dirname, p)

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: './dist/js/[name].[hash:7].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'], // 省略后缀
    // mainFiles: ['index'], // import from './目录' 的解析方式 寻找目录下index 会尝试extensions
    alias: { // 别名
      '@': resolve('src')
    }
  },
  externals: { // 外控者

  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // isProduction ? 
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
        removeAttributeQuotes: true // 去除标签属性值的双引号
      }
    })
  ],
  devServer: {
    contentBase: resolve('./dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    hot: true,
  }
}
