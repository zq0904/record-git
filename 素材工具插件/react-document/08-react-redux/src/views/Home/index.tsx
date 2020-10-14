import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from '../../store'
import './index.scss'

const Home = () => {
  const todo = useSelector((state: State) => state.todo)
  return (
    <>
      <h2>首页</h2>
      <Link to="/todo">到 todo</Link>
      <pre>{
        JSON.stringify(todo, null, 2)
      }</pre>
    </>
  )
}

export default Home
