// babel 插件开发
module.exports = function ({ parse, traverse, template, types: t }, pluginArg, cwdPath) {
  // console.log(pluginArg) // 插件参数
  return {
    visitor: {
      Identifier(nodePath, state) {
        console.log(state.opts) // 插件的参数 主要是插件如果模块化写法 不是能很方便的从pluginArg 获取插件的参数
        if (nodePath.isIdentifier({ name: 'a' })) nodePath.node.name = 'aa'
        if (nodePath.isIdentifier({ name: 'b' })) nodePath.node.name = 'bb'
      },
    },
  }
}
