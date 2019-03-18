// 转发更高阶组件的refs  (中间变量不使用ref)
import React, { Component } from 'react'

const Btn = React.forwardRef((props, ref) => (
  <button {...props} ref={ref}/>
))
const ref = React.createRef()

setTimeout(() => {
  console.log(ref.current)
}, 0)

const A = props => (
  <div>
    <h3>我是A组件</h3>
    <p>{JSON.stringify(props)}</p>
  </div>
)

// 这是一个高阶组价 （高阶组件简单理解 本质是函数 根据参数 返回组件）（功能：打印组件更新时的）
function logProps(C) {
  class LogProps extends Component {
    componentDidUpdate(prevProps, prevState) {
      console.log('prev', prevProps, prevState)
      console.log('next', this.props, this.state)
    }
    render() {
      const {
        props: { forwardref, ...args }
      } = this
      return (<C {...args} ref={forwardref} />)
    }
  }
  const forwardRef = (props, ref) => (
    <LogProps {...props} forwardref={ref} />
  )
  forwardRef.displayName = C.name // DevTools中显示的自定义名字
  return React.forwardRef(forwardRef)
}

const LA = logProps(A) // 使用高阶组件 (类似中间件)
const LBtn = logProps(Btn)

export default class extends Component {
  state = { name: 1 }
  clickhandler = () => {
    this.setState(state => ({
      name: ++state.name
    }))
  }
  render() {
    return (
      <div>
        <LA name={this.state.name}/>
        <button onClick={this.clickhandler}>更改传入的props</button>
        {/* 在对一个高阶组件 使用 forwardRef时 由于透传ref指向是logProps 所以透传中间不使用ref */}
        <LBtn ref={ref}>LBtn</LBtn>
      </div>
    )
  }
}