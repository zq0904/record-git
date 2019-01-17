class Ele extends React.Component {
  name = '齐小琦'
  html = <script>123</script>
  jsxConversion() { // babel编译jsx语法 会转换成如下方法调用 类似uve中渲染函数
    // <h4 className="red">文本内容</h4>
    return React.createElement(
      'h4',
      {className: 'red'},
      '文本内容'
    )
    // 这个函数会返回一个对象（虚拟dom） 形如：{type: 'h4', ...}
  }
  render() {
    return ( // 这里的小括号是防止 自动分号的bug
      // class不再适用使用className 这种驼峰命名法
      <div className="box">
        <h4>{this.name}</h4>
        <div>{this.jsxConversion()}</div>
        <p>{Date.now()}</p>
        {/* 组件名称必须以大写字母开头 */}
        <NoStateComponent name={this.name}/>
        <HasStateComponent name={this.name}/>
      </div>
    )
  }
}
// 无状态的组件
function NoStateComponent({name}) {
  return (
    <div>无状态的组件：{name}</div>
  )
}
// 有状态的组件
class HasStateComponent extends React.Component {
  render() {
    // this.props.name = 2 // react规定所有React组价必须像“纯函数”那样使用他们的props props是只读性的 不能随意变更
    return (
      <div>有状态的组件：{this.props.name}</div>
    )
  }
}

ReactDOM.render(<Ele />, document.getElementById('vm')) // 使用ReactDom.render方法将根元素渲染到视图中

// 即便整体渲染react也会很智能 按需渲染
setInterval(() => ReactDOM.render(<Ele />, document.getElementById('vm')), 1000)