import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import classnames from 'classnames'
import { State } from '../../../store'
import { Actions, TODO_SET_STATE, FilterType } from '../../../types'
import './index.scss'

const mapStateToProps = (state: State) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const clsPrefix = 'todo-footer'

/**
 * 根据 展示的过滤类型 映射 文案
 */
const MapFilterTypeToText = {
  [FilterType.All]: '所有',
  [FilterType.Unfinished]: '未完成',
  [FilterType.Complete]: '完成',
}

const TodoFooter: FC<PropsFromRedux> = ({ dispatch, todoState }) => {
  if (todoState.list.length === 0) return <></>

  // 未完成的list
  const unfinishedListtodos = todoState.list.filter(({ complete }) => !complete)

  // 清除完成的list项
  const handleClearComplete = () => {
    dispatch<Actions>({
      type: TODO_SET_STATE,
      payload: {
        list: unfinishedListtodos
      }
    })
  }

  return (
    <div className={clsPrefix}>
      <p>{ unfinishedListtodos.length } 个项目未完成</p>
      <ol>
        {
          [
            FilterType.All,
            FilterType.Unfinished,
            FilterType.Complete
          ].map((v, i) => (
            <li
              className={classnames({ on: v === todoState.filterType })}
              key={i}
            >
              <NavLink
                className={clsPrefix + '-filter-type'}
                to={`/todo/${v}`}
              >{ MapFilterTypeToText[v] }</NavLink>
            </li>
          ))
        }
      </ol>
      {
        todoState.list.some(({ complete }) => complete) && (
          <span
            className={clsPrefix + '-del-complete'}
            onClick={handleClearComplete}
          >
            将完成的选项都清除
          </span>
        )
      }
    </div>
  )
}

export default connector(TodoFooter)
