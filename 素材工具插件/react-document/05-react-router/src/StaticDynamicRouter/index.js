import React from 'react';
import { Route, Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config' // renderRoutes(routes, extraProps = {}, switchProps = {})

const A = props => <div>A { props.extraProps }</div>
const B = props => <div>B { props.extraProps }</div>

const Root = ({ route }) => { // 使用react-router-config配置的静态路由 当匹配到该组件时 props中会接受route参数 为routes中匹配的route项用于继续渲染子路由
  return (
    <div>
      <h2>Root</h2>
      { renderRoutes(route.routes, { extraProps: 'extraProps' }) }
    </div>
  )
}

const routes = [
  {
    // 没有path默认就匹配
    component: Root,
    routes: [
      {
        path: '/StaticDynamicRouter',
        exact: true,
        component: A,
        routes: [
          {
            component: B
          }
        ]
      },
      {
        path: '/StaticDynamicRouter/B',
        component: B
      }
    ]
  }
]

export default class extends React.Component {
  state = {
    toggle: true
  }
  render() {
    const {
      state: { toggle },
      props: {
        match: { path }
      }
    } = this
    return (
      <div>
        <h2>动态路由</h2>
        <button onClick={() => this.setState(prevState => ({ toggle: !prevState.toggle }))}>切换</button>
        <Route path={path} component={toggle ? A : B} />

        <h2>静态路由 基于react-router-config</h2>
        <button onClick={() => this.props.history.push(`${path}/B`)}>显示B</button>
        { renderRoutes(routes) }
      </div>
    );
  }
}
