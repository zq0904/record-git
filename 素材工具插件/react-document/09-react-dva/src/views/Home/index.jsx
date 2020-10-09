import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

const Home = ({ dispatch, list, setStore }) => {

  const handleClick = () => {
    setStore({
      list: [1, 2]
    })
    // dispatch({
    //   type: 'Home/setStore',
    //   payload: {
    //     list: [1, 2]
    //   }
    // })
  }

  return (
    <>
      <h2>Home</h2>
      <Link to="/foo">link 到 foo</Link>
      <p>{
        JSON.stringify(list, null, 2)  
      }</p>
      <button onClick={handleClick}>变更store</button>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  list: state.Home.list,
})

const mapDispatchToProps = {
  setStore: (payload) => ({
    type: 'Home/setStore',
    payload
  }),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Home)
