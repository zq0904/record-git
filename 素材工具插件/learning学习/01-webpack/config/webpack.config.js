// 默认webpack 使用的配置文件是 package.json同级的 webpack.config.js 或 webpackfile.js
const path = require('path')
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}