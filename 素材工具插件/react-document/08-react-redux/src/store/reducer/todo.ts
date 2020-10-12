import { LsHelp } from '../../common/ts'
import { Todo, TodoAction, FilterType, TODO_SET_STATE } from '../../types'

const lsTodoList = new LsHelp<Todo['list']>('todo-list')

const initialTodo: Todo = {
  loading: false,
  list: lsTodoList.get() ?? [],
  filterType: FilterType.All,
}

export default (state = initialTodo, action: TodoAction) => {
  switch (action.type) {
    case TODO_SET_STATE:
      // 拦截器 对存储过list的操作做本地存储
      if (action.payload.list) lsTodoList.set(action.payload.list)
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
