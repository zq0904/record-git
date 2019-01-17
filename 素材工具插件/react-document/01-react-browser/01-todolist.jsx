// 一个简单的todolist
class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      text: ''
    }
    this.handlerSubmit = this.handlerSubmit.bind(this) // 这个函数永久绑定了this 哪怕它单独使用，相比只在render写bind(this)是很局限的
    this.handlerChange = this.handlerChange.bind(this)
  }
  handlerSubmit(e) {
    e.preventDefault()
    if (this.state.text.trim() === '') return
    this.setState(prevState => ({
      arr: prevState.arr.concat([{
        id: Date.now(),
        text: this.state.text
      }]),
      text: ''
    }))
  }
  handlerChange(e) {
    this.setState({
      text: e.target.value
    })
  }
  render() {
    return (
      <div>
        <h4>TodoApp</h4>
        <Todo arr={this.state.arr} />
        <form onSubmit={this.handlerSubmit}>
          <input type="text" onChange={this.handlerChange} value={this.state.text} /><br />
          <button type="submit">添加事项</button>
        </form>
      </div>
    )
  }
}
class Todo extends React.Component {
  render() {
    return (
      <ul>{this.props.arr.map(v => <li key={v.id}>{v.text}</li>)}</ul>
    )
  }
}

ReactDOM.render(<TodoApp/>, document.getElementById('vm'))