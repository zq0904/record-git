console.log('入口文件执行了')
// webpack 支持 CommenJs AMD Es6模块
// webpack默认是不支持css的打包 可以通过相应的loader实现打包
// import 'style-loader!css-loader!./assets/css/index.css' // 行内注释方式
import './assets/css/index.css'
const { log } = require('./a')
log()