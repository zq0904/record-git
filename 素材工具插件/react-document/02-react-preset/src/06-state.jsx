// 状态提升
// 例子 提供 摄氏度 华氏度 2种输入
class T extends React.Component {
  Map = { c: '摄氏度', f: '华氏度' }
  render() {
    const { props: { type, value, onChange }, Map } = this
    return (
      <fieldset>
        <legend>{Map[type]}</legend>
        <input type="text" value={value} onChange={e => onChange(type, e.target.value)}/>
      </fieldset>
    )
  }
}

class Ele extends React.Component {
  constructor(props) {
    super(props)
    this.state = { type: 'c', t: 0 }
    this.handlerChange = this.handlerChange.bind(this)
  }
  handlerChange = (type, t) => {
    this.setState({ type, t })
  }
  toC(f) { return (f - 32) * 5 / 9 }
  toF(c) { return (c * 9 / 5) + 32 }
  render() {
    const { state: { t, type }, toC, toF } = this
    const c = type === 'c' ? t : toC(t)
    const f = type === 'f' ? t : toF(t)
    return (
      <div>
        <T type="c" value={c} onChange={this.handlerChange}/>
        <T type="f" value={f} onChange={this.handlerChange}/>
      </div>
    )
  }
}

ReactDOM.render(<Ele />, document.getElementById('vm'))