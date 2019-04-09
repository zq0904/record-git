// 插件列表 https://github.com/rollup/awesome
import { eslint } from 'rollup-plugin-eslint'
import json from 'rollup-plugin-json'
import clear from 'rollup-plugin-clear' // 清除dist目录
import nodeResolve from 'rollup-plugin-node-resolve' // 便于正确加载使用node_modules下三方模块
import commonjs from 'rollup-plugin-commonjs' // 将 commonjs模块规范 转化为 es6模块规范
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify' // 压缩js

const rollupConfig = {
  input: './src/index.js',
  output: [
    {
      file: './dist/zero.js',
      format: 'umd', // amd cjs esm iife umd
      name: 'Zero' // (iife/umd格式必须) 全局导出的变量名
    }
  ],
  plugins: [
    eslint({
      throwOnError: true, // 错误 直接抛出 中断打包
      throwOnWarning: true, // 警告 直接抛出 中断打包
      include: ['src/**']
    }),
    json(),
    clear({
      targets: ['./dist/'],
      watch: true // 监听每次重新编译
    }),
    nodeResolve(),
    commonjs({
      include: '**'
    }),
    babel(),
    uglify()
  ]
}

export default rollupConfig
