import React, { Component, lazy, Suspense } from 'react'
// import('./Box.jsx').then(res => console.log(res)) // 确实可以异步加载组件 但是 我想要的是 在使用这个组件的时候去异步加载 React中提供了一个React.lazy方法
const Box = lazy(() => import('./Box.jsx')) // 懒加载组件 只有在使用这个组件的时候才会去异步加载组件

export default class Lazy extends Component {
  clickHandler() {
    import('../util/math.js')
      .then(({ add }) => { // code splitting
        window.alert(add(1, 2, 3))
      })
  }
  render() {
    return (
      <div>
        <h3>{name}</h3>
        <button onClick={this.clickHandler}>点击</button>
        {/* 使用React提供的Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <Box name="首页"/>
        </Suspense>
      </div>
    )
  }
}