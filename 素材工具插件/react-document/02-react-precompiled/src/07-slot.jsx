// React 建议使用组合 而非继承 来组织重用组件之间的关系
// Sidebar Dialog
class Box extends React.Component {
  render() {
    const boxStyle = {
      width: '25%',
      textAlign: 'center',
      border: '1px solid red',
    }
    return (
      // 在一个组件中使用插槽 在组件内部 通过this.props获取插槽的内容 是虚拟dom jsx编译完也是虚拟dom 描述dom的对象
      // 对于多个插槽直接使用props
      <div style={boxStyle}>{ this.props.children }</div>
    )
  }
}

class Dialog extends React.Component {
  render() {
    const { props: { children, title, content } } = this
    return (
      <Box>
        <h1>{ title }</h1>
        <div>{ content }</div>
        <div>{ children }</div>
      </Box>
    )
  }
}

class Ele extends React.Component {
  state = { isShow: false }
  render() {
    const { state: { isShow } } = this
    return (
      <div className="ele">
        {
          isShow && (
          <Dialog title="标题" content="内容">
            <div>底部</div>
          </Dialog>)
        }<br/>
        <button type="button" onClick={e => this.setState(old => ({ isShow: !old.isShow }))}>toggle</button>
      </div>
    )
  }
}

ReactDOM.render(<Ele/>, document.getElementById('vm'))