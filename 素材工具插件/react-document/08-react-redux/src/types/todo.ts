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
export type Todo = {
  list: TodoList;
  filterType: FilterType;
  loading: boolean;
}

// actionType
export const TODO_SET_STATE = 'TODO_SET_STATE' // 设置 todo 的 state

// saga actionType
export const SAGA_GET_TODO_LIST = 'SAGA_GET_TODO_LIST'

// action
export interface TodoSetState {
  type: typeof TODO_SET_STATE;
  payload: Partial<Todo>;
}

// saga action
export interface SagaGetTodoList {
  type: typeof SAGA_GET_TODO_LIST;
}

export type TodoAction = TodoSetState | SagaGetTodoList // 可以多个联合类型
