import React, { Component, lazy } from 'react'

const Box = lazy(() => import('./Box.jsx'))

export default class RouterCodeSplitting extends Component {
  render() {
    return (
      <div>
        <h1>路由懒加载</h1>
        <Box name="路由懒加载"/>
      </div>
    )
  }
}