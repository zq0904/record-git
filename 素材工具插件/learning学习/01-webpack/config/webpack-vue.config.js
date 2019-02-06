const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
	devServer: {
		host: '0.0.0.0',
		port: 5000,
		open: true,
		hot: true
	},
	mode: 'development',
	entry: path.resolve(__dirname, '../src/app.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(js|vue)$/,
				use: ['eslint-loader']
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html'
		}),
		new StyleLintPlugin({
			configFile: path.resolve(__dirname, '../stylelint.config.js'),
			context: path.resolve(__dirname, '../src'), // 只检测src目录下
			files: ['**/*.vue', '**/*.(c|le|sc|sa)ss'], // 检测文件正则
			fix: true // 自动修复
		})
	]
}