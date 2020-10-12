import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
// import TestHook from './module/TestHook'
// import TestSaga from './module/TestSaga'
import { State } from '../../store'
import { Actions, FilterType, TODO_SET_STATE } from '../../types'

const mapStateToProps = (state: State) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type TodoProps = RouteComponentProps<{ filterType?: FilterType }> & PropsFromRedux

const Todo: FC<TodoProps> = ({ match, dispatch }) => {

  useEffect(() => {
    // 初始化数据
    dispatch<Actions>({
      type: TODO_SET_STATE,
      payload: {
        filterType: match.params.filterType ?? FilterType.All
      }
    })
    // 本地缓存
  }, [match, dispatch])

  return (
    <>
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
      {/* <TestHook /> */}
      {/* <TestSaga /> */}
    </>
  )
}

export default connector(Todo)

// npm i redux react-redux @types/react-redux redux-thunk
// npm i redux-saga
// npm i @reduxjs/toolkit
