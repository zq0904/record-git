const fse = require('fs-extra')
const path = require('path')
const babelParser = require('@babel/parser') // 将代码解析为ast语法抽象树
const { default: babelTraverse } = require('@babel/traverse') // 对ast语法抽象树的 进一步遍历和更新节点
const { default: babelGenerator } = require('@babel/generator')
const ejs = require('ejs')
const { log, isIncludesSuffix, path: { projectPath, packagePath } } = require('./util')
const defaultConfig = require('./defaultConfig')

// test
// const users = ['geddy', 'neil', 'alex']
// const a = ejs.render('<%= users.join(" | "); %>', {users: users},)
// console.log(a)
// test

// todo 只处理cjs规范
class Compile {
  constructor(config) {
    this.config = Object.assign(defaultConfig, config) // 这里仅是演示 如使用webpack-merge
    this.modules = {}
    this.start()
  }
  async start() {
    await this.parsing(this.config.entry)
    console.log(this.modules)
    this.generate()
  }
  generate() {
    ejs.renderFile(
      path.resolve(packagePath, 'lib/template.ejs'),
      {
        entry: this.config.entry,
        modules: this.modules,
      },
      (err, str) => {
        if (err) return
        // console.log(str)
        fse.writeFileSync('1.js', str)
      }
    )
  }
  async getSource(modulePath) {
    // node_modules模块
    if (!/^\/|\./.test(modulePath)) {
      return '' // todo
    }
    // 相对模块
    const moduleAbsolutePath = path.resolve(projectPath, modulePath)
    // 包含后缀
    if (isIncludesSuffix(moduleAbsolutePath)) {
      return fse.readFile(moduleAbsolutePath, 'utf8').catch(err => log(`Module not found: '${moduleAbsolutePath}'`))
    }
    // 不包含后缀 尝试使用extensions解析 './a'
    for (const suffix of this.config.resolve.extensions) {
      if (fse.existsSync(moduleAbsolutePath + suffix)) {
        return fse.readFile(moduleAbsolutePath + suffix, 'utf8')
      }
    }
    log(`Module not found: '${moduleAbsolutePath}'`)
  }
  async parsing(modulePath) { // './src/index.js'
    const source = await this.getSource(modulePath)
    const relyPath = [] // 用于存放该模块 依赖其他模块的路径
    const ast = babelParser.parse(source)
    babelTraverse(ast, {
      CallExpression(node, opts) { // 调用表达式 钩子
        // console.log('CallExpression', node, opts)
        if (node.node.callee.name === 'require') { // 调用表达式 的名字 是 require
          node.node.callee.name = '__webpack_require__'
          node.node.arguments[0].value = './' + path.join(modulePath, '../', node.node.arguments[0].value)
          relyPath.push(node.node.arguments[0].value)
        }
      }
    })
    // console.log(newAst)
    const { code } = babelGenerator(ast)
    this.modules[modulePath] = code
    console.lg
    relyPath.length > 0 && await Promise.all(relyPath.map(p => this.parsing(p)))
  }
}

module.exports = Compile
