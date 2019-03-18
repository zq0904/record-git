import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics' // 自动复制所有非React静态方法

class A extends React.Component {
  static asd() { console.log('asd') }
  render() {
    return (
      <div>
        A组件
      </div>
    )
  }
}
class B extends React.Component {
  render() {
    return (
      <div>
        B组件
      </div>
    )
  }
}

// HOC 获取组件并返回新组件的函数 抽取组件相同的实现
function log(C) {
  class M extends React.Component {
    componentDidMount() {
      console.log(this.props)
    }
    componentDidUpdate(prevProps, prevState) {
      console.log(prevProps, prevState)
      console.log(this.props, this.state)
    }
    render() {
      return (<C {...this.props} />)
    }
  }
  hoistNonReactStatic(M, C) // 使用 hoist-non-react-statics HOC将自动复制所有非React的静态方法
  return M
}
const LA = log(A)
LA.asd()

export default () => (<LA a="a" b="b"></LA>)
