const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // webpack4已经集成了js压缩 生产模式下就是压缩的（对于在其他模式下的js压缩）

const resolve = url => path.resolve(__dirname, url)
const isPrd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isPrd ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: resolve('dist'),
    filename: './js/[name].[hash:7].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 省略后缀
    alias: { // 别名
      '@': resolve('src')
    }
  },
  externals: { // 外控者
    jquery: '$'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.m?jsx?$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader' } },
      { // css模块化 不用在 node_modules src/assets
        test: /\.(sc|sa|c)ss$/,
        exclude: [resolve('node_modules'), resolve('src/assets')],
        use: [
          isPrd ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } } : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // 模块化
              localIdentName: '[path]-[name]-[local]-[hash:base64:5]',
            },
          },
          'sass-loader'
        ],
      }, {
        test: /\.(sc|sa|c)ss$/,
        include: [resolve('node_modules'), resolve('src/assets')],
        use: [
          isPrd ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } } : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader', // url-loader 小于limit DataURl编码内置模板 大于limit file-loader 拷贝文件修改url路径
        options: {
          limit: 8000,
          name: 'img/[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  plugins: [
    isPrd ? new CleanWebpackPlugin() : () => {},
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
        removeAttributeQuotes: true // 去除标签属性值的双引号
      }
    }),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      ignore: ['.*', '*.html']
    }]),
    isPrd ? new MiniCssExtractPlugin({ filename: 'css/[name].[hash:7].css' }) : () => {}, // 打包后的css文件放入css/ 其中引用的静态资源如url()通过file-loader处理 矫正publicPath: '../'
    isPrd ? new OptimizeCssAssetsPlugin() : () => {},
    // new UglifyJsPlugin(),
  ],
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    hot: true
  },
}