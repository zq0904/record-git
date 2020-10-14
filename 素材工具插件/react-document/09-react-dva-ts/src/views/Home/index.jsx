import React from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

const mapStateToProps = (state, ownProps) => ({
  homeState: state.Home
})

const connector = connect(mapStateToProps)

const Home = ({ dispatch, homeState }) => {

  const handleJump = () => {
    // 由于dva使用的是 react-router-redux 强耦合导航跳转使用dispatch(action)
    dispatch(routerRedux.push({
      pathname: '/foo/456',
      query: { // 这个query 虽然能在下一个页面拿到 但是不会依据tab的持久化策略 基本没用
        b: 1
      }
    }))
  }

  const handleAddList = () => {
    dispatch({
      type: 'Home/setState',
      payload: {
        list: [...homeState.list, '新数据']
      }
    })
  }

  const handleGetInfo = () => {
    dispatch({ type: 'Home/getInfo' })
  }

  return (
    <>
      <h2>Home</h2>
      <Link to="/foo/123">link 到 foo</Link>&nbsp;&nbsp;
      <button onClick={handleJump}>js 路由导航跳转到 foo</button>&nbsp;&nbsp;
      {/* 
        总结
          1. hash路由 不能使用 query string 来实现依据tab的持久化策略 因为都是在hash后面添加
          2. hash路由 可以使用 动态路径来实现 类似 query string 依据tab的持久化策略
      */}
      <button onClick={handleAddList}>
        同步操作 添加list
      </button>&nbsp;&nbsp;
      <button onClick={handleGetInfo}>
        异步操作 获取信息
      </button>
      <pre>{
        JSON.stringify(homeState, null, 2)
      }</pre>
    </>
  )
}

export default connector(Home)
