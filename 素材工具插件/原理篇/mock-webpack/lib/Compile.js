const fse = require('fs-extra')
const path = require('path')
const babelParser = require('@babel/parser') // 将代码解析为ast语法抽象树
const { default: babelTraverse } = require('@babel/traverse') // 对ast语法抽象树的 进一步遍历和更新节点
const { path: { projectPath } } = require('./util')

// todo 只处理cjs规范
class Compile {
  constructor(config) {
    this.config = config
    this.result = {}
    this.parsing(this.config.entry)
  }
  parsing(modulePath) { // './src/index.js'
    const relyPath = []
    if (!/^\/|\./.test(modulePath)) { // 相对模块
      fse
        .readFile(path.resolve(projectPath, modulePath), 'utf8')
        .then(res => {
          const ast = babelParser.parse(res)
          babelTraverse(ast, {
            CallExpression(node, opts) { // 调用表达式 钩子
              console.log('CallExpression', node, opts)
              if (node.node.callee.name === 'require') { // 调用表达式 的名字 是 require
                node.node.callee.name = '__webpack_require__'
                node.node.arguments[0].value // './a.js'
                './' + path.join(modulePath, '../', node.node.arguments[0].value)
                relyPath.push()
              }
            }
          })
        })
    } else { // node_modules模块

    }
  }
}

module.exports = Compile
