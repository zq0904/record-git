import React, { useState, FC, ChangeEvent, KeyboardEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { State } from '../../../store'
import { Actions, TODO_SET_STATE } from '../../../types'
import './index.scss'

const mapStateToProps = (state: State) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)
// TODO 关于dispatch的类型如何精简
type PropsFromRedux = ConnectedProps<typeof connector> 

const clsPrefix = 'todo-header'

const TodoHeader: FC<PropsFromRedux> = ({ dispatch, todoState }) => {
  const [val, setVal] = useState('')

  /**
   * 全选按钮change
   */
  const handleAllSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch<Actions>({
      type: TODO_SET_STATE,
      payload: {
        list: todoState.list.map(v => {
          v.complete = e.target.checked
          return v
        })
      }
    })
  }

  /**
   * input 回车
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13) return
    const text = val.trim()
    if (!text) return
    dispatch<Actions>({
      type: TODO_SET_STATE,
      payload: {
        list: [
          ...todoState.list,
          {
            id: (todoState.list.length > 0 ? todoState.list[todoState.list.length - 1].id : 0) + 1,
            text,
            complete: false,
          }
        ]
      }
    })
    setVal('')
  }

  /**
   * 发起一个异步请求
   */
  const handleSendAsyncRequest = () => {
    // TODO 1. 尝试redux-thunk 2. 尝试saga
    // dispatch((dispatch) => {
    //   setTimeout(() => {
    //     // Yay! Can invoke sync or async actions with `dispatch`
    //     dispatch(increment());
    //   }, 1000);
    // })
  }

  return (
    <div className={clsPrefix}>
      {
        todoState.list.length > 0 && (
          <input
            className={clsPrefix + '-input-checkbox'}
            type="checkbox"
            checked={todoState.list.every(({ complete }) => complete)}
            onChange={handleAllSelectChange}
          />
        )
      }
      <input
        className={clsPrefix + '-input-text'}
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={handleKeyDown}
      />&nbsp;&nbsp;
      <button onClick={handleSendAsyncRequest}>发起一个异步请求</button>
    </div>
  )
}

export default connector(TodoHeader)
