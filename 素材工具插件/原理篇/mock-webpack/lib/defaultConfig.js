const path = require('path')
const { path: { projectPath } } = require('./util')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(projectPath, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js'],
  }
}