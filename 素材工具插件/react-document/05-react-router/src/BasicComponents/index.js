import React, { Fragment } from 'react';
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import './index.less'; // create-react-app 默认是不支持less的 使用 react-app-rewired重写配置

// 基本组件
// React Router中有三种类型的组件：路由器组件 路由匹配组件 导航组件
// 对于Web项目 路由器组件：<BrowserRouter>和<HashRouter>
// 路由匹配组件：<Route>和<Switch>
// 导航组件 <Link>
export default class extends React.Component {
  render() {
    const { match: { path } } = this.props
    return (
      <Fragment>
        {/*
          <Redirect to="/login" /> 这个是一个重定向组件 只要这个组价存在 会直接跳转到相应路由中
          <Link /> 组件 没有activeClassName属性
          <NavLink /> 组件 activeClassName属性 当路由匹配时 该类被添加
        */}
        <h2>基本组件</h2>
        <ul>
          <li><NavLink to={`${path}/a`} activeClassName="on">a</NavLink></li>
          <li><NavLink to={`${path}/404orError`} activeClassName="on">404orError</NavLink></li>
        </ul>
        <Switch>
          {/*
            没有写 path的 Route 一直都是匹配的
            Switch 仅渲染与当前位置匹配的第一个子元素 于js逻辑相同
          */}
          <Route path={path} exact render={() => <p>默认渲染</p>} />
          <Route path={`${path}/a`} render={() => <p>a</p>} />
          <Route render={() => <p>什么都不匹配时 匹配 这个组件 通常用作404组件 或 error组件</p>} />
        </Switch>
      </Fragment>
    );
  }
}
