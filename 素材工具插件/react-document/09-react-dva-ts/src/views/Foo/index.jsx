import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

const Foo = ({ dispatch, fooState, match }) => {
  console.log('foo match', match)

  return (
    <>
      <h2>Foo</h2>
      <Link to="/">link 到 home</Link>
      <p>id：{fooState.id}</p>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  fooState: state.Foo
})

export default connect(mapStateToProps)(Foo)
