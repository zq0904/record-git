import { GET_TODO_LIST } from './uri'
import { TodoList } from '../types'

const request = (uri: string): any => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      flag: 1,
      msg: '凉凉了',
      data: {
        list: [{
          text: '测试1',
          id: 91,
          complete: false,
        }, {
          text: '测试2',
          id: 92,
          complete: true,
        }, {
          text: '测试3',
          id: 93,
          complete: true,
        }]
      }
    })
  }, 1000)
})

export interface GetTodoList {
  (): Promise<{ flag: 0 | 1; msg?: string; data: { list: TodoList }; }>;
}
export const getTodoList: GetTodoList = () => request(GET_TODO_LIST)
