import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import TodoHeader from './containers/TodoHeader'
import TodoMain from './containers/TodoMain'
import TodoFooter from './containers/TodoFooter'
import TestHook from './module/TestHook'
import TestSaga from './module/TestSaga'
import store from './store'
import { filterTypes, FilterType } from './types'
import './index.scss'

function toFilterType (str: any): FilterType {
  if (filterTypes.includes(str)) return str
  return FilterType.All
}

type ExampleTodoListProps = RouteComponentProps<{ filterType?: string }>

const ExampleTodoList: FC<ExampleTodoListProps> = ({ match }) => {
  const filterType = toFilterType(match.params.filterType)
  return (
    <Provider store={store}>
      <TodoHeader />
      <TodoMain filterType={filterType} />
      <TodoFooter filterType={filterType} />
      <TestHook />
      <TestSaga />
    </Provider>
  )
}

export default ExampleTodoList

// npm i redux react-redux @types/react-redux redux-thunk
// npm i redux-saga
// npm i @reduxjs/toolkit
