// react中组件名以大写字母开头 本质是在js中的变量 react将视小写字母为普通dom元素
class Clock extends React.Component {
  state = {
    time: Date.now()
  }
  componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({
        time: Date.now()
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timeId)
  }
  render() {
    return (
      <div>
        <h4>时钟组件</h4>
        <p>{this.state.time}</p>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('vm'))