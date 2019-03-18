import React, { Component } from 'react';

const MyC = React.createContext('defaultVal') // 1.创建context 设置默认值

class Box extends Component {
  render() {
    return (
      // 在Consumer中的value 不需要声明contextType
      <MyC.Consumer>
        {value => <div>{value}</div>}
      </MyC.Consumer>
    )
  }
}

class Bottom extends Component {
  static contextType = MyC // 必须声明 才能获取最近当前值this.context
  render() {
    return (
      <div className="bottom">
        <p>{this.props.name}：{this.context}</p>
      </div>
    )
  }
}

class Middle extends Component {
  render() {
    return (
      <div className="middle"><Bottom name="使用Provider取其value值"></Bottom></div>
    )
  }
}

class Top extends Component {
  render() {
    return (
      <div>
        <Bottom name="没有匹配的Provider时，使用默认值"></Bottom>
        {/* 2.每个Context对象都附带一个Provider React组件 可以订阅上下文的更改 value是呀传递给后代组件的值 */}
        <MyC.Provider value="nowVal">
          <Middle className="middle"></Middle>
        </MyC.Provider>
        <Box/>
        <MyC.Provider value="nowVal">
          <Box/>
        </MyC.Provider>
      </div>
    )
  }
}

export default Top