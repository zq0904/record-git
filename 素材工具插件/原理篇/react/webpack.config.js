const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const outputDir = resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: outputDir,
    filename: 'index.js'
  },
  // devtool: 'eval-source-map',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    open: true,
    contentBase: outputDir,
    compress: true,
    port: 9000
  }
}
