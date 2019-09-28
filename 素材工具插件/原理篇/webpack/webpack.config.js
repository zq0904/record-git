const path = require('path')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.sass'], // 省略后缀
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
            loader: './loader/1.js',
            options: {
              name: '昨天'
            }
          },
          './loader/2.js',
        ]
      },
      {
        test: /\.js$/,
        use: './loader/3.js',
      },
      {
        test: /\.js$/,
        use: {
          loader: './loader/4.js',
          options: {
            name: '昨天'
          }
        }
      }
    ]
  }
}