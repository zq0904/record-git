import React, { useState, FC, ChangeEvent, KeyboardEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { State, useDispatch  } from '../../../store'
import { TodoSetStateActionType } from '../../../types'
import './index.scss'

const mapStateToProps = (state: State) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector> 

const clsPrefix = 'todo-header'

const TodoHeader: FC<PropsFromRedux> = ({ todoState }) => {
  const dispatch = useDispatch()
  const [val, setVal] = useState('')

  /**
   * 全选按钮change
   */
  const handleAllSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: TodoSetStateActionType,
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
    dispatch({
      type: TodoSetStateActionType,
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
      />
    </div>
  )
}

export default connector(TodoHeader)
