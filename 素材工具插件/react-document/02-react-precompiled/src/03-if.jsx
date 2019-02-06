function C(props) {
  return props.isShow ? (
    <div>C组件</div>
  ) : null // 如果想不显示组件 返回 null 或 false 不显示(不渲染)组件仍然会触发componentDidUpdate生命周期钩子
}
class If extends React.Component {
  state = {
    islogin: true,
    list: ['a', 'b', 'c'],
    isShow: true,
    i: 1
  }
  handleClick = () => {
    this.setState(old => ({ islogin: !old.islogin }))
  }
  componentDidMount() {
    // this.setState 是异步的
    // React可以将多个setState()调用批处理为单个更新以提高性能
    this.setState({
      i: this.state.i + 3
    })
    this.setState({
      i: this.state.i * 2
    })
    console.log(this.state.i) // 1
    // 推选的做法
    // this.setState(old => ({
    //   i: old.i + 3
    // }))
    // this.setState(old => ({
    //   i: old.i * 2
    // }))
    // console.log(this.state.i) // 1
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() {
    const { islogin, list } = this.state
    let btn;
    if (islogin) {
      btn = <button>登出</button>
    } else {
      btn = <button>登录</button>
    }
    return (
      <div>
        { btn }<br/>
        <button type="submit" onClick={this.handleClick}>更改登录状态</button><br/>
        {/* 内联条件 */}
        {list.length && list}<br/>
        {islogin ? '登出' : '登录'}<br/>
        {
          // jsx中不能使用if条件判断 可以使用三元代替
          islogin ? (
            '登出'
          ) : (
            '登录'
          )
        }<br/>
        <button type="submit" onClick={() => this.setState({ isShow: !this.state.isShow })}>切换显示C组件</button>
        <C isShow={this.state.isShow} />
      </div>
    )
  }
}

ReactDOM.render(<If/>, document.getElementById('vm'))