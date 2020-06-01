import React, { FC } from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { PropsFromRedux } from '../../containers/TodoFooter/index'
import { filterTypes, MapFilterTypeToText } from '../../types'
import './index.scss'

const clsPrefix = 'todo-footer'

const TodoFooter: FC<PropsFromRedux> = ({ list, filterType, setTodosList }) => {
  if (list.length === 0) return null

  /**
   * 过滤出 未完成的list项
   */
  const todosUnfinished = list.filter(({ complete }) => !complete)

  /**
   * 是否有完成的
   */
  const isComplete = list.some(({ complete }) => complete)

  /**
   * 清除完成的list项
   */
  const handleClearComplete = () => setTodosList(todosUnfinished)

  return (
    <div className={clsPrefix}>
      <p>{ todosUnfinished.length }个项目未完成</p>
      <ol>
        {
          filterTypes.map((v, i) => (
            <li
              key={i}
              className={classnames(filterType, { on: v === filterType })}
            >
              <NavLink className={clsPrefix + '-filter-type'} to={`/todo/${v}`}>{ MapFilterTypeToText[v] }</NavLink>
            </li>
          ))
        }
      </ol>
      {
        isComplete && (
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

export default TodoFooter
