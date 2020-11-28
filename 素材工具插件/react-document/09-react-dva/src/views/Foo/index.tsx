import React, { FC } from 'react'
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
import { Link, RouteComponentProps } from 'dva/router'
import { State } from '../../types'

const mapStateToProps = (state: State) => ({
  fooState: state.Foo
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type FooProps = RouteComponentProps<{ id: string; }> & PropsFromRedux

const Foo: FC<FooProps> = ({ dispatch, fooState, match, location }) => {

  return (
    <>
      <h2>Foo</h2>
      <Link to="/">link 到 home</Link>&nbsp;&nbsp;
      <p>match.params.id：{match.params.id}</p>
      <p>fooState.id：{fooState.id}</p>
      <p>location.search：{location.search}</p>
    </>
  )
}

export default connector(Foo)
