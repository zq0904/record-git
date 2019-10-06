const path = require('path')
const {
  path: { projectPath }
} = require('./util')

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js']
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(projectPath, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: []
  },
  plugins: []
}
