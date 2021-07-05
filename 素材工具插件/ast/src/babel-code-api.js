const fs = require('fs')
const path = require('path')
// 除了直接使用 babel 命令行外 可以直接使用Api对代码进行编译
const babel = require('@babel/core')

const code = fs.readFileSync(path.resolve(process.cwd(), 'build/source.js'), 'utf-8')

const res = babel.transformSync(code, {
  presets: ['@babel/env'],
  plugins: [require.resolve('./babel-plugin.js')]
})

console.log(res.code)
