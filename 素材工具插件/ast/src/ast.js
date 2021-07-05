// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
const parser = require('@babel/parser') // 字符串 => ast
const { default: traverse } = require('@babel/traverse') // 遍历 ast
const t = require('@babel/types') // 构建、验证和转换AST node 的方法
const { default: template } = require('@babel/template') // 构建、验证和转换AST node 的方法
const { default: generate } = require('@babel/generator') // ast => 字符串

// 查 https://astexplorer.net/

const sourceCode = `async function square(n) {
  return n * n;
}`

const ast = parser.parse(sourceCode, {
  // sourceType: "module", // default: "script" 解析的模式
  // plugins: ["jsx"], // default: [] 启用内部插件
  sourceFilename: 'func.js'
})

// 遍历 是一个 深度优先遍历
traverse(ast, { // 访问者模式
  // Identifier(nodePath) { // 等价于 Identifier: { enter() { ... } }
  //   // nodePath 用来描述 node之间的相互关联 还包括了遍历、添加、更新、移动和删除node的方法
  //   // console.log(nodePath) // { parent: parentNode, node: currentNode }
  // },
  // BlockStatement: { // 对于同一个node 你有2次机会访问
  //   enter() {},
  //   exit() {},
  // },
  // 'enter|exit'() {}, // 同一个函数应用到多个node
  
  FunctionDeclaration(nodePath) {
    // 实现一个把参数 n 改成 x 的需求
    // if (nodePath.node.id.name !== 'square') return
    // const x = 'x'
    // const paramName = nodePath.node.params[0].name
    // nodePath.node.params[0].name = x
    // nodePath.traverse({
    //   Identifier(nodePath) {
    //     if (nodePath.node.name === paramName) nodePath.node.name = x
    //     // console.log(this) // { a: 1 } 通过传递第二个参数 改变this进而传参
    //   }
    // }, { a: 1 })

    // 其实可以发现只要重命名绑定及其引用就可以了
    nodePath.scope.rename('n', 'x')

    // 通过 get 获取 子nodePath 可以看到每个字段都有 nodePath 只不过简单的type为undefined
    // nodePath.get('params.0')

    // 插入容器
    // nodePath.get('body').unshiftContainer('body', template(`const a = 'aaa'`)())
    // nodePath.get('body').pushContainer('body', template(`const b = 1`)())
  },

  enter(nodePath) {
    // 对 nodePath 的类型和属性检测 效果与 node 一致
    // nodePath.isIdentifier({ name: 'n' })
    // t.isIdentifier(nodePath.node, { name: 'n' }) // 等价 针对 node
    // nodePath.node !== null && nodePath.node.type === 'Identifier' && nodePath.node.name === 'n' // 等价 针对 node

    // 断言版本 返回不是boolean 不符合直接抛错
    // nodePath.assertIdentifier({ name: 'n' })
    // t.assertIdentifier(nodePath.node, { name: 'n' }) 
  },

  Identifier(nodePath) {
    // 检查是否引用了标识符 不是声明 而是引用一个变量
    // nodePath.isReferencedIdentifier()
    // t.isReferenced(nodePath.node, nodePath.parent)

    // 向上查找
    // nodePath.findParent(path => path.isFunctionDeclaration()) // 从当前的nodePath向上遍历树 直到返回true 返回那个nodePath
    // nodePath.find(path => path.isFunctionDeclaration()) // 包括当前 nodePath
    // nodePath.getFunctionParent() // 找到最近的父函数或程序的 nodePath { type: FunctionDeclaration }
    // nodePath.getStatementParent() // 沿着树向上走，直到我们遇到列表中的父节点路径 body中那一级
  },

  // Get Sibling Paths 获取兄弟 nodePath 参考文档

  BinaryExpression(nodePath) {
    if (nodePath.get('operator').node === '*') {
      // nodePath.replaceWith( // 替换成一个node
      //   t.binaryExpression('-', nodePath.get('left').node, t.stringLiteral('2')) // 生成 node
      // )
      // nodePath.replaceWithMultiple([ // 替换成多个node
      //   t.stringLiteral('s'),
      //   t.binaryExpression('-', nodePath.get('left').node, t.stringLiteral('2')),
      // ])
      // nodePath.replaceWithSourceString('1 + 1') // 用源字符串替换 node
      // nodePath.insertBefore(t.stringLiteral('s')) // node 前后追加
      // nodePath.insertAfter(t.stringLiteral('s'))
      // nodePath.remove() // 删除 node
      // nodePath.parentPath['xxx'] // 替换父级
    }
  }
})

// 使用 template 准引用 大大减少手动构建大量 AST
// 没有占位符 可以直接使用 template.ast
const getAst = template(`
  var %%A%% = require(%%PACKAGE%%);
  var B = Date.now()
`)
const AST = t.program( // generate仅接收单个根 AST 节点
  getAst({
    A: t.identifier('a'),
    PACKAGE: t.stringLiteral('react')
  })
)

const res = generate(AST, {
  // minified: true,
  // sourceMaps: true, // 详细参考 https://babeljs.io/docs/en/babel-generator
},
// { // 与sourceMap有关
//   'func.js': sourceCode
// }
)

console.log(res)
