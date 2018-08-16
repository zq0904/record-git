const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

// path.join 就是将每个path片段链接起来
// console.log(path.join(__dirname, '/a'), path.join(__dirname, './a'), path.join(__dirname, 'a'), path.join('b', 'a'))
// path.resolve 得到绝对路径 '/' 会解析为根路径
// console.log(path.resolve(__dirname, '/a'), path.resolve(__dirname, './a'), path.resolve(__dirname, 'a'), path.resolve('b', 'a'))

module.exports = {
  entry: './src/main.js', // 入口
  output: { // 出口
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  optimization: {
    runtimeChunk: 'single', // 将运行时代码拆分成单独的块
    splitChunks: { // 重复模块去除 单独提取
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
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
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') // 任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量
    }),
  ]
}
