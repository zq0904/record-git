import React, { FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTodoListAction, thunkCreateTodoListAction } from '../../actions'
import { State, Dispatch } from '../../store'
import './index.scss'

const clsPrefix = 'test-hook'

// redux hooks 参考 http://react-china.org/t/topic/34076
const TestHook: FC = () => {
  // 返回store的引用 比如用于替换store的reducers 不会触发视图更新!!! 不常用
  // const store = useStore<State, Actions>()

  // selector函数 直接返回的值 发生变更 则组件render 和 mapStateToProps很相似
  // 不应该返回“新对象” 因为返回一个新对象导致必然的渲染 如果想获取state中的多个值 建议多次调用useSelector
  // 1次dispatch 虽然可能会导致组件内部多个useSelector产生更新 但是由于批量更新行为 只会渲染一次
  // const list = useSelector((state: State) => state.todos.list)
  const loading = useSelector((state: State) => state.todos.loading)

  const dispatch = useDispatch<Dispatch>()

  // 同步更新
  const handleClick = () => {
    dispatch(createTodoListAction([{ id: 999, text: 'text', complete: false }]))
  }

  // 同步更新
  const handleClick2 = () => {
    // @ts-ignore
    dispatch(thunkCreateTodoListAction())
  }

  return (
    <div className={clsPrefix}>
      <h4>redux hook</h4>
      <p>
        loading:
        { JSON.stringify(loading, null, 2) }
      </p>
      <button
        onClick={handleClick}
      >同步更新todolist</button>
      <button
        onClick={handleClick2}
      >异步更新todolist</button>
    </div>
  )
}

export default memo(TestHook)
