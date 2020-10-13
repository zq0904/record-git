import React from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../store'
import { TodoSetStateActionType, TodoGetInitialDataActionType } from '../../../types'
import './index.scss'

const clsPrefix = 'test-saga'

const TestSaga = () => {

  const dispatch = useDispatch<Dispatch>()

  // 同步更新
  const handleClick = () => {
    dispatch({
      type: TodoSetStateActionType,
      payload: {
        list: [{ id: 999, text: 'text', complete: false }]
      }
    })
  }

  // 异步更新
  const handleClick2 = () => {
    dispatch({ type: TodoGetInitialDataActionType })
  }

  return (
    <div className={clsPrefix}>
      <h4>redux-saga</h4>
      <button
        onClick={handleClick}
      >同步更新</button>
      <button
        onClick={handleClick2}
      >异步更新</button>
    </div>
  )
}

export default TestSaga
