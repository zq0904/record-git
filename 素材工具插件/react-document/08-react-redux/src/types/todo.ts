/**
 * 过滤类型
 */
export enum FilterType {
  All = 'All',
  Unfinished = 'Unfinished',
  Complete = 'Complete',
}

export type TodoList = { id: number; text: string; complete: boolean; }[]

// state
export type TodoState = {
  list: TodoList;
  filterType: FilterType;
  loading: boolean;
}

// actionType
export const TodoSetStateActionType = 'TodoSetStateActionType'
export const TodoResetActionType = 'TodoResetActionType'

// action
export type TodoSetStateAction = {
  type: typeof TodoSetStateActionType;
  payload: Partial<TodoState>;
}
export type TodoResetAction = {
  type: typeof TodoResetActionType;
}

// saga actionType
export const TodoGetTodoListActionType = 'TodoGetTodoListActionType'
export const TodoGetInitialDataActionType = 'TodoGetInitialDataActionType'

// saga action
export type TodoGetTodoListAction = {
  type: typeof TodoGetTodoListActionType;
}
export type TodoGetInitialDataAction = {
  type: typeof TodoGetInitialDataActionType;
}

export type TodoAction = TodoSetStateAction
  | TodoResetAction
  | TodoGetTodoListAction
  | TodoGetInitialDataAction
