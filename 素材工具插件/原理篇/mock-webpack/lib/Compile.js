const fse = require('fs-extra')
const path = require('path')
const babelParser = require('@babel/parser') // 将代码解析为ast语法抽象树
const { default: babelTraverse } = require('@babel/traverse') // 对ast语法抽象树的 进一步遍历和更新节点
const { default: babelGenerator } = require('@babel/generator')
const ejs = require('ejs')
const webpackMerge = require('webpack-merge')
const {
  log,
  escape,
  isRelativeModule,
  isIncludesSuffix,
  isArray,
  isObject,
  isString,
  path: { projectPath, packagePath }
} = require('./util')
const defaultConfig = require('./defaultConfig')

// todo 只处理cjs规范
class Compile {
  constructor(config) {
    this.config = webpackMerge(defaultConfig, config)
    this.modules = {}
    this.start()
  }
  async start() {
    await this.parsing(this.config.entry)
    console.log('modules', this.modules)
    this.generate()
  }
  generate() {
    ejs.renderFile(
      path.resolve(packagePath, 'lib/template.ejs'),
      {
        entry: this.config.entry,
        modules: this.modules
      },
      (err, str) => {
        if (err) return
        // outputFile 创建文件时上级目录不存在会直接创建
        fse.outputFile(
          path.resolve(this.config.output.path, this.config.output.filename),
          str
        )
      }
    )
  }
  extensions(relyPath) {
    const moduleAbsolutePath = path.resolve(projectPath, relyPath)
    for (const suffix of this.config.resolve.extensions) {
      if (fse.existsSync(moduleAbsolutePath + suffix)) return relyPath + suffix
    }
    log(`Module not found: '${moduleAbsolutePath}'`)
  }
  useLoaderToProcess(source, modulePath) {
    // loader的本质就是一个函数 用来处理满足规则的 源代码 loader的加载顺序为 ”双倒序“
    const { rules } = this.config.module
    let medianSource = source
    const _loadLoader = function(p) {
      // todo node_modules模块
      if (!isRelativeModule(p)) {
        medianSource = ''
      }
      medianSource = require(path.resolve(projectPath, p)).call(
        this,
        medianSource
      )
    }
    for (let i = rules.length - 1; i >= 0; i--) {
      const { test, use } = rules[i]
      if (test.test(modulePath)) {
        // 规则匹配
        if (isString(use)) {
          _loadLoader(use)
          continue
        }
        if (isObject(use)) {
          _loadLoader.call({ query: use.options }, use.loader)
          continue
        }
        if (isArray(use)) {
          for (let j = use.length - 1; j >= 0; j--) {
            if (isString(use[j])) {
              _loadLoader(use[j])
              continue
            }
            if (isObject(use[j])) {
              _loadLoader.call({ query: use[j].options }, use[j].loader)
              continue
            }
          }
        }
      }
    }
    return medianSource
  }
  async getSource(modulePath) {
    // todo node_modules模块
    if (!isRelativeModule(modulePath)) {
      return ''
    }
    // 相对模块 包含后缀
    const moduleAbsolutePath = path.resolve(projectPath, modulePath)
    return fse
      .readFile(moduleAbsolutePath, 'utf8')
      .catch(err => log(`Module not found: '${moduleAbsolutePath}'`))
  }
  async parsing(modulePath) {
    let source = await this.getSource(modulePath)
    source = this.useLoaderToProcess(source, modulePath)
    const relyPaths = [] // 用于存放该模块 依赖其他模块的路径
    const ast = babelParser.parse(source)
    babelTraverse(ast, {
      // 调用表达式 钩子
      CallExpression: (node, opts) => {
        if (node.node.callee.name === 'require') {
          // 调用表达式 的名字 是 require
          node.node.callee.name = '__webpack_require__'
          let relyPath =
            './' + path.join(modulePath, '../', node.node.arguments[0].value)
          // 相对模块 且 没有后缀 尝试使用extensions解析
          if (/^\/|\./.test(relyPath) && !isIncludesSuffix(relyPath))
            relyPath = this.extensions(relyPath)
          node.node.arguments[0].value = relyPath
          // 处理循环引用 (缓存模块不存在 且 没有加载自己)
          !Object.keys(this.modules).includes(relyPath) &&
            relyPath !== modulePath &&
            relyPaths.push(relyPath)
        }
      }
    })
    const { code } = babelGenerator(ast)
    this.modules[modulePath] = escape(code)
    if (relyPaths.length > 0) {
      for (const relyPath of relyPaths) {
        await this.parsing(relyPath)
      }
    }
  }
}

module.exports = Compile
