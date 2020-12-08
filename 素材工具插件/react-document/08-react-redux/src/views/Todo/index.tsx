import React, { FC, useEffect } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
import TestHook from './TestHook'
import { State, useDispatch } from '../../store'
import {
  FilterType,
  TodoGetInitialDataActionType,
  TodoSetStateActionType,
  TodoResetActionType,
} from '../../types'

const mapStateToProps = (state: State) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type TodoProps = RouteComponentProps<{ filterType?: FilterType }> & PropsFromRedux

const Todo: FC<TodoProps> = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // 初始化数据
    dispatch({
      type: TodoSetStateActionType,
      payload: {
        filterType: match.params.filterType ?? FilterType.All
      }
    })
  }, [match, dispatch])

  useEffect(() => {
    // 初始化数据
    dispatch({ type: TodoGetInitialDataActionType })
    return () => {
      // 重置
      dispatch({ type: TodoResetActionType })
    }
  }, [dispatch])

  return (
    <>
      <Link to="/">到 home</Link>
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
      <TestHook />
    </>
  )
}

export default connector(Todo)

