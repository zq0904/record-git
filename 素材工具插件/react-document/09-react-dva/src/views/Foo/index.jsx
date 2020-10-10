import React from 'react'
import { Link } from 'dva/router'

const Foo = () => {
  return (
    <>
      <h2>Foo</h2>
      <Link to="/">link 到 home</Link>
    </>
  )
}

export default Foo
