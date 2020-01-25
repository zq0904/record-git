import React, { Component, createRef, Fragment } from 'react'
import { withRouter, Link, NavLink, Route, matchPath } from 'react-router-dom'
import './index.less'

const A = (props) => {
  // console.log(props)
  return <div>A</div>
}
const withRouterA = withRouter(A)
// matchPath方法
const match = matchPath('/Api/a/1', {
  path: '/Api/a/:id',
  exact: true,
  strict: false
})
// console.log(, A)
// console.log(match)
// {
//   isExact: true,
//   params: {id: "1"},
//   path: "/Api/a/:id",
//   url: "/Api/a/1",
// }

export default class index extends Component {
  dom = createRef()
  componentDidMount() {
    console.log(this.$el, this.dom.current, this.component)
  }
  render() {
    return (
      <div>
        <h2>Api</h2>
        <Link to="/Api/test?a=1#b">Link to string 自己拼</Link><br />
        <Link to={{ pathname: '/Api/test', search: '?a=1', hash: '#b', state: {a:1} }}>link to属性对象形式</Link><br />
        {/* 不会添加历史 会直接替换历史 */}
        <Link to="/Api/replace" replace>replace</Link><br />
        <Link to="/Api/innerRef" innerRef={node => this.$el = node}>innerRef</Link><br />
        {/* innerRef dom回调直接选中生成的a标签 className等属性会透传至a标签 */}
        <Link to="/Api/innerRef" innerRef={this.dom} className="asd" title="title" id="id">innerRef</Link><br />
        {/*
          NavLink 被选中时
          activeClassName 作用的类
          activeStyle 作用的样式
          exact 严格匹配
        */}
        <NavLink to="/Api/test" exact activeClassName="on" activeStyle={{backgroundColor: 'blue'}}>NavLink</NavLink>
        <ul>
          <Route path="/Api" exact component={A} />
          <Route path="/Api" exact render={() => <A />} />
          {/*
            children 无论路由是否匹配 都会执行 是否渲染取决于 return 组件 还是 null
            接受参数与 render component 相同
            把这个组件渲染权 交到你手里
            优先级 children > component > render
          */}
          <Route
            path="/Api/asd"
            children={(props) => {
              console.log(props)
              return props.match && (
                <Fragment>
                  <li>1</li>
                  <li>2</li>
                </Fragment>
              )
            }}
          />
          {/* path属性 可以接受数组 表多个匹配 没有path表始终匹配 */}
          <Route path={['/Api/a/:id', '/Api/b/:id']} component={A} />
          {/*
            在获取location时 使用 props.location 不应使用 props.history.location 它是可变的
            以路由 /Api/a/1 为例 props.match { isExact: true 是否严格匹配 params: {id: "1"} 解析的路径参数 path: "/Api/a/:id" 用于构建嵌套的<Route> url: "/Api/a/123" 用于构建嵌套的<Link>
          */}
          {/*
            <Route component={}></Route>
            这种没有path属性的Route将始终匹配 match为从 父节点(最近的Route)继承它们的match对象 在这里就是 /Api
          */}
        </ul>
        {/*
          使用withRouter包装过的组件
          具有一个WrappedComponent静态属性 包装的组件
        */}
        <withRouterA.WrappedComponent />
      </div>
    )
  }
}