import React, { Component, Fragment } from 'react';
import { Route, withRouter, ScrollRestoration } from 'react-router-dom';

// 编程式导航 withRouter作用

const Asd = props => {
  console.log('Asd-props', props)
  return <div>Asd</div>
}
// withRouter 高阶函数的作用 使不是直接通过路由渲染出来的组件 props也会挂载history、location、match属性
const WithRouterAsd = withRouter(Asd)

export default class extends React.Component {
  handleClick = () => {
    const { history, match: { path } } = this.props
    history.push(`${path}/Asd`)
  }
  render() {
    const { match: { path } } = this.props
    console.log('index-path', path)
    return (
      <Fragment>
        <button type="button" onClick={this.handleClick}>编程式导航</button>
        <Asd></Asd>
        <WithRouterAsd></WithRouterAsd>
        <Route path={`${path}/Asd`} component={Asd} />
      </Fragment>
    );
  }
}
