import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom'

function Index() {
  return <h2>首页</h2>;
}

function About() {
  return <h2>关于</h2>;
}

function Users({ match: { path } }) {
  // 嵌套路由
  return (
    <Fragment>
      <h2>用户</h2>
      <ol>
        <li><Link to={`${path}/a`}>a</Link></li>
        <li><Link to={`${path}/b`}>b</Link></li>
      </ol>
      <Route path={path} exact render={() => <div>用户 - 默认展示</div>} />
      <Route path={`${path}/a`} render={() => <div>用户 - a</div>} />
      <Route path={`${path}/b`} render={() => <div>用户 - b</div>} />
    </Fragment>
  );
}

export default class extends React.Component {
  render() {
    const { match: { path } } = this.props
    return (
      <Fragment>
        <nav>
          <ul>
            <li>
              <Link to={path}>首页</Link>
            </li>
            <li>
              <Link to={`${path}/About`}>关于</Link>
            </li>
            <li>
              <Link to={`${path}/Users`}>用户</Link>
            </li>
          </ul>
        </nav>
          {/*
            /不光匹配 Index组件 也匹配其他组件 解决办法
            1.要么使用精准模式 给Route组件添加exact属性
            2.要么使用Switch(js语法switch匹配到了就break退出 不会同时匹配2个Route)
          */}
        <Route path={`${path}/`} exact component={Index} />
        <Route path={`${path}/About`} component={About} />
        <Route path={`${path}/Users`} component={Users} />
      </Fragment>
    );
  }
}