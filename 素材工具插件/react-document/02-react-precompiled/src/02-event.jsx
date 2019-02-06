class Eve extends React.Component {
  constructor(props) {
    super(props)
    this.handlerClick1 = this.handlerClick1.bind(this) // 1.将 原型方法 直接bind this 赋值给 实例方法
  }
  handlerClick1(e) {
    e.preventDefault()
    console.log(this, e)
  }
  // 2.直接使用箭头函数定义实例方法
  handlerClick2 = e => {
    e.preventDefault()
    console.log(this, e)
  }
  handlerClick3(c, e) {
    e.preventDefault()
    console.log(this, e, c)
  }
  handlerClick4(c, e) {
    e.preventDefault()
    console.log(this, e, c)
  }
  render() {
    return (
      <div>
        {/* this绑定问题 前2种比较推选 */}
        {/* 传参问题 只有 3 4 支持传递参数 bind方式e为最后一个参数 */}
        <a href="" onClick={this.handlerClick1}>获取this 方式1</a><br/>
        <a href="" onClick={this.handlerClick2}>获取this 方式2</a><br/>
        {/* 3.通过实例this调用 缺点：单独使用handlerClick3不能保证this */}
        <a href="" onClick={e => this.handlerClick3('参数', e)}>获取this 方式3</a><br/>
        {/* 4.直接bind this 缺点：单独使用handlerClick3不能保证this */}
        <a href="" onClick={this.handlerClick4.bind(this, '参数')}>获取this 方式4</a><br/>
      </div>
    )
  }
}
ReactDOM.render(<Eve/>, document.getElementById('vm'))