import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const Home = () => {
  return (
    <>
      <h2>首页</h2>
      <Link to="/todo">到 todo</Link>
    </>
  )
}

export default Home
