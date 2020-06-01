// start todo模块

export type TodoListItem = { id: number; text: string; complete: boolean }

export type TodoList = TodoListItem[]

export type Loading = boolean

export type Todo = {
  list: TodoList;
  loading: Loading;
}

// actionType

export const SET_TODO_LIST = 'SET_TODO_LIST' // 设置 Todos模块下 list字段
export const SET_TODO_LOADING = 'SET_TODO_LOADING' // 设置 Todos模块下 loading字段

// saga actionType
export const SAGA_GET_TODO_LIST = 'SAGA_GET_TODO_LIST'

// action

export interface SetTodoListAction {
  type: typeof SET_TODO_LIST;
  payload: TodoList;
}

export interface SetTodoLoadingAction {
  type: typeof SET_TODO_LOADING;
  payload: Loading;
}

// saga action
export interface SagaGetTodoList {
  type: typeof SAGA_GET_TODO_LIST;
}

export type TodoAction = SetTodoListAction | SetTodoLoadingAction | SagaGetTodoList // 可以多个联合类型

// end todo模块

// 主模块

/**
 * 所有模块的action
 */
export type Actions = TodoAction

/**
 * 过滤类型
 */
export enum FilterType {
  All = 'All',
  Unfinished = 'Unfinished',
  Complete = 'Complete',
}

/**
 * 展示的过滤类型
 */
export const filterTypes = [
  FilterType.All,
  FilterType.Unfinished,
  FilterType.Complete
]

/**
 * 根据 展示的过滤类型 映射 文案
 */
export const MapFilterTypeToText = {
  [FilterType.All]: '所有',
  [FilterType.Unfinished]: '未完成',
  [FilterType.Complete]: '完成',
}
