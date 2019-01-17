class Ele extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: Date.now()
    }
  }
  componentDidMount() {
    this.timeId = setInterval(() => {
      // React可以将多个setState()的调用合并成一个 以提高性能 （类似浏览器回流及重绘）
      this.setState({
        date: Date.now()
      })
      // this.setState可能是异步的 尽量不要在setState中通过this.state使用之前的状态 而应该使用函数参数
      // 不好的方式：
      // this.setState({ 
      //   date: this.state.date + Date.now()
      // })
      // 推荐的方式：
      // this.setState((prevState, props) => ({
      //   date: prevState.date + Date.now()
      // }))
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeId)
  }
  render() {
    return (
      <div>
        <h4>每隔1s重新渲染</h4>
        <p>{this.state.date}</p>
      </div>
    )
  }
}

ReactDOM.render(<Ele />, document.getElementById('vm'))