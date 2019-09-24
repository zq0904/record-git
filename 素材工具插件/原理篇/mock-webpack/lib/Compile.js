const fse = require('fs-extra')
const babelParser = require('@babel/parser')
const { default: babelTraverse } = require('@babel/traverse')
const path = require('path')
const { path: { projectPath } } = require('./util')

// todo 只处理cjs规范
class Compile {
  constructor(config) {
    this.config = config
    this.result = {}
    this.parsing(this.config.entry)
  }
  parsing(relativePath) {
    fse
      .readFile(path.resolve(projectPath, relativePath), 'utf8')
      .then(res => {
        const ast = babelParser.parse(res)
        babelTraverse(ast, {
          VariableDeclarator(node, opts) {
            console.log(node, opts)
            // console.log(node.scope.globals.require, opts)
          }
        })
        // ast.program.body
      })
  }

}

module.exports = Compile
