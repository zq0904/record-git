import React from 'react';
import { Route, Link } from 'react-router-dom'

// 自己实现一个路由助手配置函数
const renderRouters = (routers) => {
  return routers.map(v => {
    return (
      <Route
        key={v.path}
        path={v.path}
        render={(props) => <v.component {...props} route={v} />}
      />
    )
  })
}

const H = ({route}) => {
  return (
    <div>
      <h2>H</h2>
      { renderRouters(route.routers) }
    </div>
  )
}
const A = (props) => <div>A {props.match.url}</div>
const B = (props) => <div>B {props.match.url}</div>

const routers = [{
  path: '/renderRoutes',
  component: H,
  routers: [{
    path: '/renderRoutes/a',
    component: A,
  }, {
    path: '/renderRoutes/b',
    component: B,
  }]
}]

export default class index extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/renderRoutes">H</Link></li>
          <li><Link to="/renderRoutes/a">A</Link></li>
          <li><Link to="/renderRoutes/b">B</Link></li>
        </ul>
        { renderRouters(routers) }
      </div>
    );
  }
}