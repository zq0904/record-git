class Ele extends React.Component {
  
  constructor(props) {
    super(props)
    this.handlerIntegration = this.handlerIntegration.bind(this)
    this.state = {
      name: '',
      describe: '',
      schooling: '3',
      // 整合onChange事件
      integrationCheckbox: false,
      integrationText: '',
    }
  }
  handlerSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }
  // 整合onChange事件
  handlerIntegration(e) {
    const { name, value, checked } = e.target
    let val
    switch(name) {
      case 'integrationCheckbox':
        val = checked
        break;
      case 'integrationText':
        val = value
      default:
        break;
    }
    this.setState({ [name]: val })
  }
  render() {
    const { name, describe, schooling, integrationCheckbox, integrationText } = this.state
    return (
      <form action="" onSubmit={this.handlerSubmit}>
        {/* <input value={null} /> */}
        <label htmlFor="name">名字：</label>
        {/*
          1.如果只想赋个默认的初始值 使用defaultValue (非受控)
          2.如果使用value 则必须提供onChange 需要自己实现双向绑定 (受控)
          3.defaultValue value 不能同时出现
        */}
        <input id="name" type="text" value={name} onChange={e => this.setState({ name: e.target.value })}/><br/>
        <label>描述：
          <textarea cols="20" rows="3" value={describe} onChange={e => this.setState({ describe: e.target.value })}></textarea>
        </label><br/>
        <label>学历：
          {/* html标签在option上使用selected来设置默认选择 react中直接根据select标签的value 更方便 */}
          <select value={schooling} onChange={e => this.setState({ schooling: e.target.value })}>
          {/* multiple value={['1', '2']} 可以设置multiple属性将数组传递给value以实现多选 */}
            <option value="1">本科</option>
            <option value="2">博士</option>
            <option value="3">硕士</option>
          </select>
        </label><br/>
        {/* 处理多个输入 整合onChange事件 */}
        {/* checkbox 使用checked而非value */}
        <label>整合onChange事件：<input type="checkbox" name="integrationCheckbox" checked={integrationCheckbox} onChange={this.handlerIntegration}/></label><br/>
        <label>整合onChange事件：<input type="text" name="integrationText" value={integrationText} onChange={this.handlerIntegration}/></label><br/>
        <input type="submit" value="提交"/>
      </form>
    )
  }
}

ReactDOM.render(<Ele/>, document.getElementById('vm'))