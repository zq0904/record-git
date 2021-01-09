// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
const { parse } = require('@babel/parser') // 字符串 => ast
const t = require('@babel/types') // 构建、验证和转换AST节点的方法
const { default: traverse } = require('@babel/traverse') // 遍历ast
const { default: generate } = require('@babel/generator') // ast => 字符串

// 查 https://astexplorer.net/

// 增 const a = 1 + 1
// const binaryExpression = t.binaryExpression('+', t.numericLiteral(1), t.numericLiteral(1)) // 1 + 1
// const variableDeclarator = t.variableDeclarator(t.identifier('a'), binaryExpression) // a = 1 + 1
// const variableDeclaration = t.variableDeclaration('const', [variableDeclarator]) // const a = 1 + 1
// const ast = parse('')
// ast.program.body.push(variableDeclaration) // 将内容放入body中
// const { code } = generate(ast, { quotes: 'single', retainLines: true })
// console.log(code) // const a = 1 + 1

// 删


// 改 TODO 如何在一定范围内遍历
const ast = parse(`
  const obj = {
    a: 1,
    b: 1 + 1
  }
`)

traverse(ast, {
  exit() {
    console.log('exit!')
  },
  enter(path) { // 每个都会遍历
    console.log('enter!')
    // path.traverse({
    //   enter() { // 每个节点都有2次访问机会
    //     console.log('enter!')
    //   },
    //   exit() {
    //     console.log('exit!')
    //   }
    // })
    // t.isBinaryExpression(path.node), // 判断该节点是否是二级制表达式
    // t.isBinaryExpression(path.node, { operator: '+' }) // 是二级制表达式 并且 操作符是+
  },
  // 'enter|exit'(path) { }, // 同一个函数应用到多种访问节点
  ObjectExpression (path) { // xxx() {} 等价于 xxx: { enter() {} } 的简写形式
    const propertie = t.objectProperty(t.identifier('c'), t.stringLiteral('c'))
    // path.pushContainer('properties', propertie) // 子节点为数组时 push一个node
    path.unshiftContainer('properties') // 子节点为数组时 push一个node
    // unshiftContainer insertBefore insertAfter
  },
  BinaryExpression (path) {
    if (path.node.operator === '+') {
      path.replaceWith(t.binaryExpression('*', path.node.left, path.node.right)) // 替换该节点
    }
  },
})
const { code } = generate(ast, { quotes: 'single', retainLines: true })
console.log(code) // const b = 1 * 1
