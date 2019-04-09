import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

// 1.使用react原声提供的 lazy方法 和 Suspense组件 环境需支持import动态加载语法 (babel需配置@babel/plugin-syntax-dynamic-import)
const A = lazy(() => import(`./${'A'}`))
const B = lazy(() => import('./B'))

// 2.使用@loadable/component 相比 原声（lazy方法 和 Suspense组件）支持SSR等优点
const AA = loadable(() => import('./A'), {
  fallback: <div>Loading...</div>
})
const BB = loadable(() => import('./B'), {
  fallback: <div>Loading...</div>
})

export default class extends React.Component {
  render() {
    const { match: { path } } = this.props
    return (
      <Fragment>
        <h2>原声-代码分割</h2>
        <ul>
          <li><Link to={`${path}/A`}>A</Link></li>
          <li><Link to={`${path}/B`}>B</Link></li>
        </ul>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path={`${path}/A`} component={A} />
            <Route path={`${path}/B`} component={B} />
          </Switch>
        </Suspense>
        <h2>@loadable/component-代码分割</h2>
        <ul>
          <li><Link to={`${path}/AA`}>AA</Link></li>
          <li><Link to={`${path}/BB`}>BB</Link></li>
        </ul>
        <Switch>
          <Route path={`${path}/AA`} component={AA} />
          <Route path={`${path}/BB`} component={BB} />
        </Switch>
      </Fragment>
    );
  }
}
