import React, { FC } from 'react'
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
import { Link, routerRedux, RouteComponentProps } from 'dva/router'
import { State, Action } from '../../types'

const mapStateToProps = (state: State) => ({
  fooState: state.Foo
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type FooProps = RouteComponentProps<{ id: string; }> & PropsFromRedux

const Foo: FC<FooProps> = ({ dispatch, fooState, match }) => {

  const handleClick = () => {
    dispatch<Action>(routerRedux.push({
      pathname: '/'
    }))
  }

  return (
    <>
      <h2>Foo</h2>
      <Link to="/">link 到 home</Link>&nbsp;&nbsp;
      <button onClick={handleClick}>link 到 home</button>
      <p>id：{match.params.id}</p>
      <p>id：{fooState.id}</p>
    </>
  )
}

export default connector(Foo)
