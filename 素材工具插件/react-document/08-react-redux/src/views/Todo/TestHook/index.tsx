import React, { FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State, Dispatch } from '../../../store'
import { TodoSetStateActionType, TodoGetTodoListActionType } from '../../../types'
import './index.scss'

const clsPrefix = 'test-hook'

// redux hooks 参考 http://react-china.org/t/topic/34076

const TestHook: FC = () => {
  // 返回store的引用 比如用于替换store的reducers 不会触发视图更新!!! 不常用
  // const store = useStore<State, Actions>()

  // selector函数 直接返回的值 发生变更 则组件render 和 mapStateToProps很相似
  // 不应该返回“新对象” 因为返回一个新对象导致必然的渲染 如果想获取state中的多个值 建议多次调用useSelector
  // 触发一次dispatch 虽然可能会导致组件内部多个useSelector产生更新 但是由于批量更新行为 只会渲染一次
  const loading = useSelector((state: State) => state.todo.loading)
  const list = useSelector((state: State) => state.todo.list)

  const dispatch = useDispatch<Dispatch>()

  const handleSync = () => {
    dispatch({
      type: TodoSetStateActionType,
      payload: {
        list: [{ id: 999, text: '测试 同步更新', complete: false }]
      }
    })
  }

  const handleAsync = () => dispatch({ type: TodoGetTodoListActionType })

  return (
    <div className={clsPrefix}>
      <h4>redux hook 用法</h4>
      <button
        onClick={handleSync}
      >同步更新</button>&nbsp;&nbsp;
      <button
        onClick={handleAsync}
      >异步更新</button>
      <pre>todoState：{
        JSON.stringify({
          loading,
          list
        }, null, 2)}</pre>
    </div>
  )
}

export default memo(TestHook)
