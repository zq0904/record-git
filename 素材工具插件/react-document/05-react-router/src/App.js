import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import SetTitle from './SetTitle'
import Basis from './Basis'
import BasicComponents from './BasicComponents'
import CodeSplitting from './CodeSplitting'
import WithRouterRole from './WithRouterRole'
import StaticDynamicRouter from './StaticDynamicRouter'
import ReduxSynchronous from './ReduxSynchronous'
import Api from './Api'
import RecursivePath from './RecursivePath'
import RecursiveComponent from './RecursiveComponent'
import renderRoutes from './renderRoutes'
import ReactTransitionGroup from './ReactTransitionGroup'
import Error404 from './Error404'

// 使用create-react-app 来测试路由
// react-router是核心包 react-router-dom web开发多了Link BrowserRouter等这样的dom组件 react-router-native RN开发 设计理念万物皆组件
// 1.问题： BrowserRouter 在create-react-app 直接可用?
const App = class extends Component {
  render() {
    return (
      <SetTitle>
        <Switch>
          <Redirect exact from="/" to="/Basis" />
          <Route path="/Basis" component={Basis} />
          <Route path="/BasicComponents" component={BasicComponents} />
          <Route path="/CodeSplitting" component={CodeSplitting} />
          <Route path="/WithRouterRole" component={WithRouterRole} />
          <Route path="/StaticDynamicRouter" component={StaticDynamicRouter} />
          <Route path="/ReduxSynchronous" component={ReduxSynchronous} />
          <Route path="/Api" component={Api} />
          <Route path="/RecursivePath" component={RecursivePath} />
          <Route path="/RecursiveComponent" component={RecursiveComponent} />
          <Route path="/renderRoutes" component={renderRoutes} />
          <Route path="/ReactTransitionGroup" component={ReactTransitionGroup} />
          <Route component={Error404} />
        </Switch>
      </SetTitle>
    );
  }
}

// 如果使用 connected-react-router (!!! 注意ConnectedRouter下不能嵌套BrowserRouter)
// export default () => <Router><Root /></Router>;
export default App;