import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import classnames from 'classnames'
import { State } from '../../../store'
import { Actions, TODO_SET_STATE, FilterType } from '../../../types'
import './index.scss'

/**
 * 根据filterType 过滤todoList
 */
function filterTodoListByFilterType (list: State['todo']['list'], filterType: FilterType) {
  switch (filterType) {
    case FilterType.Complete:
      return list.filter(({ complete }) => complete)
    case FilterType.Unfinished:
      return list.filter(({ complete }) => !complete)
    case FilterType.All:
    default:
      return list
  }
}

// ownProps 默认会透传 类型需要处理下
type OwnProps = {}

// 只有这个对象的key对应的值发生变化才会 render对应的组件
// 而 mobx observe 自动查找依赖项 差距...有点大
const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  todoState: state.todo,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector> & OwnProps

const clsPrefix = 'todo-main'

const TodoMain: FC<PropsFromRedux> = ({ dispatch, todoState }) => {
  if (todoState.list.length === 0) return <></>
  
  const filterlist = filterTodoListByFilterType(todoState.list, todoState.filterType)

  return (
    <ul className={clsPrefix}>
      {
        filterlist.map(({ id, text, complete }) => (
          <li className={clsPrefix + '-item'} key={id}>
            <label className={clsPrefix + '-item-complete'}>
              <input type="checkbox"
                checked={complete}
                onChange={e => {
                  dispatch<Actions>({
                    type: TODO_SET_STATE,
                    payload: {
                      list: todoState.list.map(v => {
                        if (v.id === id) v.complete = e.target.checked
                        return v
                      })
                    }
                  })
                }}
              />
              <span className="checkbox"></span>
            </label>
            <span
              className={classnames(clsPrefix + '-item-text', { unfinished: complete })}
              onClick={() => {
                dispatch<Actions>({
                  type: TODO_SET_STATE,
                  payload: {
                    list: todoState.list.map(v => {
                      if (v.id === id) v.complete = !v.complete
                      return v
                    })
                  }
                })
              }}
            >
              { text }
            </span>
            <a
              href=" "
              className={clsPrefix + '-item-del'}
              onClick={(e) => {
                e.preventDefault()
                dispatch<Actions>({
                  type: TODO_SET_STATE,
                  payload: {
                    list: todoState.list.filter(v => v.id !== id)
                  }
                })
              }}
            >删除这一项</a>
          </li>
        ))
      }
    </ul>
  )
}

export default connector(TodoMain)
