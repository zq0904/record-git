import React from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

const Home = ({ dispatch, state }) => {

  const handleJump = () => {
    // 由于dva使用的是 react-router-redux 强耦合导航跳转使用dispatch(action)
    dispatch(routerRedux.push('/foo'))
  }

  const handleAddList = () => {
    dispatch({
      type: 'Home/setState',
      payload: {
        list: [...state.list, '新数据']
      }
    })
  }

  const handleGetInfo = () => {
    dispatch({ type: 'Home/getInfo' })
  }

  return (
    <>
      <h2>Home</h2>
      <Link to="/foo">link 到 foo</Link>&nbsp;&nbsp;
      <button onClick={handleJump}>js 路由导航跳转到 foo</button>&nbsp;&nbsp;
      <button onClick={handleAddList}>
        同步操作 添加list
      </button>&nbsp;&nbsp;
      <button onClick={handleGetInfo}>
        异步操作 获取信息
      </button>
      <pre>{
        JSON.stringify(state, null, 2)
      }</pre>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  state: state.Home
})

export default connect(mapStateToProps)(Home)
