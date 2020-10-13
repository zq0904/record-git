import { LsHelp } from '../../common/ts'
import {
  TodoState,
  TodoAction,
  FilterType,
  TodoSetStateActionType,
} from '../../types'

const lsTodoList = new LsHelp<TodoState['list']>('todo-list')

const initialTodo: TodoState = {
  loading: false,
  list: lsTodoList.get() ?? [],
  filterType: FilterType.All,
}

export default (state = initialTodo, action: TodoAction) => {
  switch (action.type) {
    case TodoSetStateActionType:
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
