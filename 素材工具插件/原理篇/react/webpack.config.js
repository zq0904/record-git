const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const outputDir = resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './src/index.jsx',
  output: {
    path: outputDir,
    filename: 'index.js'
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html')
    })
  ],
  devServer: {
    open: true,
    contentBase: outputDir,
    compress: true,
    port: 9788
  }
}
