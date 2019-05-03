import { Injectable } from '@angular/core';
import { TodoItem, Add, Del, UpdateComplete } from './interface'
import { HttpClient, HttpResponse } from '@angular/common/http'
// 组件是用来展示视图 服务是用来处理请求接口 校验等复杂逻辑的
// 组件是消费者 服务是提供商

// 服务需要注册提供商才可以使用
// 1.注册为根级的提供商 任何组件都可以使用
@Injectable({
  providedIn: 'root'
})
// 2. 3. 注册为 模块级 组件级 提供商
// @Injectable()
export class TodosService {

  constructor(private http: HttpClient) { }

  url = 'http://0.0.0.0:3010/todoList'

  getTodoList = () => {
    return this.http.get<TodoItem[]>(this.url)
  }
  add = (text: string) => {
    return this.http.post<TodoItem>(this.url, {
      text,
      isComplete: false
    })
  }
  del = (id: number) => {
    return this.http.delete<object>(`${this.url}/${id}`)
  }
  updateComplete = (id: number, isComplete: boolean) => {
    return this.http.patch<TodoItem>(`${this.url}/${id}`, {
      isComplete: !isComplete
    })
  }
}
