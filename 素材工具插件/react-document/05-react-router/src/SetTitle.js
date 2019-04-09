import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// 设置title
class SetTitle extends Component {
  // 就算不使用这种方式 也可以在Route组件的基础上自定义一个高阶组件 title 设置document.title 其他参数透传
  componentDidMount() {
    this._title = document.title // 原html页面title
    this.setTitle(this.props.location) // 首次加载
    this.props.history.listen(this.setTitle) // 监听路由的变化
  }
  setTitle = location => {
    // console.log(location, window.location.pathname)
    switch (window.location.pathname) { // 匹配了使用相应的 没匹配使用原有title
      case '/Basis':
        this.title = '基础'
        break;
      case '/BasicComponents':
        this.title = '基础组件'
        break;
      case '/CodeSplitting':
        this.title = '代码分裂'
        break;
      case '/WithRouterRole':
        this.title = 'WithRouter作用'
        break;
      case '/StaticDynamicRouter':
        this.title = '静态动态路由'
        break;
      case '/ReduxSynchronous':
        this.title = 'Redux同步'
        break;
      case '/Api':
        this.title = '部分Api测试'
        break;
      case '/RecursivePath':
        this.title = '递归路径'
        break;
      case '/RecursiveComponent':
        this.title = '递归组件'
        break;
      case '/ReactTransitionGroup':
        this.title = 'react-transition-group库'
        break;
      case '/renderRoutes':
        this.title = '实现renderRoutes'
        break;
      default:
        this.title = this._title
        break;
    }
    document.title = this.title
  }
  render() {
    return this.props.children
  }
}
// withRouter内部使用Route 来达到向props注入history等属性 这意味着 withRouter高阶函数包装得到的组件 必须使用在Router中
export default withRouter(SetTitle)