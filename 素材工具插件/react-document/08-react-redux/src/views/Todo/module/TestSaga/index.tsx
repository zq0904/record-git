import React from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../../store'
import { TODO_SET_STATE, SAGA_GET_TODO_LIST } from '../../../../types'
import './index.scss'

const clsPrefix = 'test-saga'

const TestSaga = () => {

  const dispatch = useDispatch<Dispatch>()

  // 同步更新
  const handleClick = () => {
    dispatch({
      type: TODO_SET_STATE,
      payload: {
        list: [{ id: 999, text: 'text', complete: false }]
      }
    })
  }

  // 异步更新
  const handleClick2 = () => {
    // @ts-ignore
    dispatch({ type: SAGA_GET_TODO_LIST })
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
