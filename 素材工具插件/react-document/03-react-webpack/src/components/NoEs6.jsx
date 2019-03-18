import React from 'react'

// 没有Es6的 react 通过create-react-class定义组件
// 总结： 声明默认props 初始state都采用函数方法声明 方法“自动bind this” 支持mixins
// 这种mixins模式 所有方法都会执行 mixins能的方法优先执行

var setIntervalMixins = {
  componentWillMount: function() {
    console.log('setIntervalMixins -> componentWillMount')
    this._timeId = []
  },
  setInterval: function () {
    console.log('setIntervalMixins -> setInterval')
    this._timeId.push(setInterval.apply(null, arguments))
  },
  componentWillUnmount: function () {
    console.log('setIntervalMixins -> componentWillUnmount')
    this._timeId.forEach(v => clearInterval(v))
  }
}

var createReactClass = require('create-react-class')

var NoEs6 = createReactClass({
  mixins: [setIntervalMixins],
  getDefaultProps: function () { // 声明默认props
    return {
      name: '没值'
    }
  },
  getInitialState: function () {
    return {
      num: this.props.name
    }
  },
  componentWillMount: function () {
    console.log('componentWillMount')
  },
  componentDidMount: function() {
    this.setInterval(() => console.log(this.state.num), 1000)
  },
  clickHandler: function () {
    console.log(this) // 通过createReactClass 创建的方法 自动bind this
  },
  render: function () {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <div>{this.state.num}</div>
        <button onClick={this.clickHandler}>Click</button>
      </div>
    )
  }
})

export default NoEs6


class UseEs6 extends React.Component {
  static defaultProps = { // 声明默认props
    name: '没值'
  }
  state = {
    num: this.props.name
  }
  clickHandler() {
    console.log(this) // undefined
  }
  render() {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <div>{this.state.num}</div>
        <button onClick={this.clickHandler}>Click</button>
      </div>
    )
  }
}

// export default () => <UseEs6/>
