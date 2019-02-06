// gulp 基于流的自动化构建工具
const { src, dest, series, parallel, watch } = require('gulp')
const connect = require('gulp-connect') // 网络服务器
const concat = require('gulp-concat') // 合并文件
const rev = require('gulp-rev') // 添加hash串 生成文件清单
const revCollector = require('gulp-rev-collector') // 根据文件清单 对html中引用做修改
const clean = require('gulp-clean') // 构建前 删除文件或文件夹
const browserify = require('browserify') // 将 cjs 转化为 iife (但Es6模块化规范import语法需要babelify包) npm i -D babelify
const source = require('vinyl-source-stream') // 将browserify的bundle()输出 转换为 vinyl流
const buffer = require('vinyl-buffer') // vinyl流 转换为 二进制流
const babel = require('gulp-babel') // 转码 babel7  npm i -D gulp-babel @babel/core @babel/preset-env
const uglify = require('gulp-uglify') // 压缩js
const sass = require('gulp-sass') // 转换sass  npm i -D node-sass gulp-sass
const cleanCSS = require('gulp-clean-css') // 压缩css
const htmlmin = require('gulp-htmlmin') // 压缩html

function cleanTask() {
  return src('./dist/**.**')
    .pipe(clean()) // 删除dist文件夹下所有文件
}
// 抽取出来的 添加文件指纹 和 生成清单
function manifestTask(cb) {
  return cb()
    .pipe(rev())
    .pipe(dest('./dist'))
    .pipe(rev.manifest(
      'manifest.json', // 生成清单的路径会与 输出dest()中路径拼接
      { merge: true } // 合并清单
    ))
    .pipe(dest('./'))
}
function jsTask() {
  return browserify({
      entries: './src/index.js', // 主文件入口
      transform: ['babelify'] // 转换Es6模块规范 npm i -D babelify
    }).bundle()
    .pipe(source('index.js')) // 输出的文件名
    .pipe(buffer())
    .pipe(babel()) // 可以直接走.babelrc的配置文件
    .pipe(uglify())
}
function cssTask() {
  return src('./src/assets/css/**.**')
    .pipe(concat('index.css')) // 合并读到的所有文件 文件名为index.css
    .pipe(sass())
    .pipe(cleanCSS())
}
function htmlTask() {
  return src(['./manifest.json', './index.html'])
    .pipe(revCollector())
    .pipe(htmlmin({
      collapseWhitespace: true, // 压缩html
      removeComments: true, // 删除html中的注释
      removeEmptyAttributes: true, // 删除没用的空属性值
      minifyJS: true, // 压缩页面js
      minifyCSS: true // 压缩页面写css
    }))
    .pipe(dest('./dist'))
}
function reloadTask() {
  return src('./index.html').pipe(connect.reload())
}
function serverTask() {
  connect.server({
    root: './dist', // 启动服务的根路径
    host: '0.0.0.0',
    port: 7777,
    livereload: true, // 启用自动刷新 没有自动开启浏览器的选项...
  })
}
const startTack = series(cleanTask, parallel(manifestTask.bind(null, jsTask), manifestTask.bind(null, cssTask)), htmlTask) // 顺序很重要 保证manifest.json文件生成后再执行htmlTask
watch(['./src/**/**.**'], series(startTack, reloadTask)) // 监听src下任意文件变动 重新编译 重新编译完成刷新服务
exports.default = series(startTack, serverTask) // gulp 默认执行这个任务 整个都编译完在运行服务