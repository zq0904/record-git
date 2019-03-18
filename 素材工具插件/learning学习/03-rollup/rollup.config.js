import nodeResolve from 'rollup-plugin-node-resolve' // 便于正确加载使用node_modules下三方模块
import commonjs from 'rollup-plugin-commonjs' // 将 commonjs模块规范 转化为 es6模块规范
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  external: ['vue'], // 外控者 import Vue from 'vue' 不会将vue打到包里而是直接使用全局就已经存在的Vue变量
  output: {
    file: './dist/index.js',
    format: 'umd', // amd cjs esm iife umd
    globals: { // 配合外控者依赖的全局变量
      vue: 'Vue',
    }
  },
  plugins: [
    nodeResolve(),
    commonjs({
      include: '**'
    }),
    babel()
  ]
}