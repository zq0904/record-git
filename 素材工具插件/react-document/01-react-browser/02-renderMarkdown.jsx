class Ele extends React.Component {
  constructor(props) {
    super(props)
    this.handlerChange = this.handlerChange.bind(this)
    this.state = {
      md: new Remarkable(),
      text: ''
    }
  }
  handlerChange(e) {
    // 执行setState方法重新渲染视图
    this.setState({
      text: e.target.value
    })
  }
  getMarkdown() {
    return {
      __html: this.state.md.render(this.state.text)
    }
  }
  render() {
    return (
      <div>
        <h4>键入</h4>
        {/* 不是所有情况都需要双向绑定 */}
        <textarea cols="30" rows="10" onChange={this.handlerChange}></textarea>
        <h4>输出</h4>
        {/* this直接调用 this指向为 */}
        <div dangerouslySetInnerHTML={this.getMarkdown()}></div>
      </div>
    )
  }
}
ReactDOM.render(<Ele />, document.getElementById('vm'))