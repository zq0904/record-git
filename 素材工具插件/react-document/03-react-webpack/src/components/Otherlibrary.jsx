import React, { Component } from 'react'
import $ from 'jquery'
import '../../node_modules/chosen-js/chosen.min.css'
import 'chosen-js' // jQ UI库 select

// export default class Otherlibrary extends React.Component {
//   componentDidMount() {
//     console.log('componentDidMount')
//     console.log(this.el)
//     this.$el = $(this.el)
//   }
//   render() {
//     console.log('render')
//     return <div ref={el => this.el = el} />
//   }
// }

// react 如何结合第三方库 采用包装的形式 包装成React组件
class Chosen extends Component {
  componentDidMount() {
    // dom 加载完成 选择dom 转jq元素 初始化插件 监听change事件
    this.$el = $(this.el)
    this.$el.chosen().change(this.props.onChange)
  }
  componentWillUnmount() {
    this.$el.chosen('destroy')
  }
  componentDidUpdate(prevProps) {
    // console.log(this.props.value)
    this.$el.trigger('chosen:updated') // 不要在 componentWillUpdate 这个钩子函数更新插件因为此时dom没有变化
  }
  render() {
    const { onChange, children, ...args } = this.props
    return (
      <div>
        <select
          ref={el => this.el = el}
          onChange={() => {}}
          {...args}>
          {children}
        </select>
      </div>
    )
  }
}

// 使用
export default class Select extends React.Component {
  state = {
    update: false,
    s: '1',
    c: '1'
  }
  componentDidMount() {
  }
  toggleOptions = () => {
    this.setState((prevState) => {
      return {update: !prevState.update}
    })
  }
  render() {
    return (
      <div>
        <h3>原声select</h3>
        <select onChange={e => this.setState({s: e.target.value})} value={this.state.s}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <h3>包装</h3>
        <button type="button" onClick={this.toggleOptions}>切换options</button>
        <input type="text" value={this.state.c} onChange={e => this.setState({c: e.target.value})}/>
        <Chosen
          style={{width: 300}}
          value={this.state.c}
          onChange={e => this.setState({c: e.target.value})}>
          {
            this.state.update ? (
              <React.Fragment>
                <option value="1">1</option>
                <option value="2">2</option>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </React.Fragment>
            )
          }
        </Chosen>
      </div>
    )
  }
}