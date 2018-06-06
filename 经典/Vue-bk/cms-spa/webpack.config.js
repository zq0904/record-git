const path = require('path'); //直接引入路径模块
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //热更新
module.exports = { //导出配置对象
  //会在打包的结果中提供一个垫脚片用以兼容低版本浏览器中的不支持的 API，入口文件路径
  entry: ['babel-polyfill', './src/main.js'], 
  output:{
    path:path.join(__dirname,'./dist/'), //出口文件模块路径 必须为绝对路径！！！ 动态拼接绝对路径
    filename:'bundle.js' //打包结果文件名称
  },
  devtool: 'inline-source-map', //错误具体信息位置
  plugins: [
    // 该插件的所用就是把 index.html 打包到你的 bundle.js 文件所属目录，也就是说 bundle 到哪里，index.html 就到哪里
    // 同时这个也会自动在 index.html 中出入 script 引用连接，而且引用的资源名称，也取决于你的 bundle 叫什么
    // 这个插件还可以配置压缩 html 的处理
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),  //热更新
    new webpack.HotModuleReplacementPlugin()  //热更新
  ],
  devServer: {
    //直接把资源打包到项目根目录下,看不见它
    contentBase: './',  //配置 webpack-dev-server 的 www 目录
    hot: true,   //热更新
    proxy: { //当请求路径是 /api 开头的时候，服务器代理访问到 http://localhost:3000
      "/api": {
        target: "http://localhost:3000", //代理访问的 目标路径
        pathRewrite: { "^/api": "" } //不是直接把 "/api" 拼接到目标路径，而是将开头的"/api"替换为空字符串 在拼接
      }
    }
  },
  externals: {
    //配置第三方包 当 import Vue 的时候 不会把Vue打包到bundle中,而是使用全局的Vue对象
    //键是包名 值是全局导出的接口对象
    vue: 'Vue',
    'vue-router':'VueRouter',
    axios:'axios',
    lodash: '_'
  },
  module: {
    rules: [{
        test: /.css$/,  //打包css
        use: [
          'style-loader', //2.根据模块动态创建 style 节点插入到 head 中
          'css-loader'    //1.将 css 转化为 JavaScript 模块
        ]
      },
      {
        test: /.(jpg|png|gif|svg)$/, //打包图片
        use: [
          'file-loader'
        ]
      },
      {
        test: /.less$/,  //打包less
        use: [
          'style-loader', //3.根据模块生成 style 节点插入 head 中
          'css-loader',   //2.在把 css 转成 JavaScript 模块
          'less-loader'   //1.把 less 转成 css
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, //不转换 node_modules 中的文件模块
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, //高速缓存目录 加入缓存节省编译时间
            presets: ['env'],
            plugins: ['transform-runtime'] //解决代码重复问题
          }
        }
      },
      {
        test: /.vue$/, //打包.vue单文件组件
        use: [
          'vue-loader'
        ]
      }
    ]
  }
};
