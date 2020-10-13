import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
// import TestHook from './module/TestHook'
// import TestSaga from './module/TestSaga'
import { State, useDispatch } from '../../store'
import {
  FilterType,
  TodoGetInitialDataActionType,
  TodoSetStateActionType,
} from '../../types'

const mapStateToProps = (state: State) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type TodoProps = RouteComponentProps<{ filterType?: FilterType }> & PropsFromRedux

const Todo: FC<TodoProps> = ({ match, todoState }) => {
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
  }, [dispatch])

  return (
    <>
    
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
      {/* <TestHook /> */}
      {/* <TestSaga /> */}
      <pre>todoState：{JSON.stringify(todoState, null, 2)}</pre>
    </>
  )
}

export default connector(Todo)

