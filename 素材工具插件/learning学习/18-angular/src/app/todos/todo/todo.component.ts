import { Component, OnInit } from '@angular/core';
import { TodoItem, Add, Del, UpdateComplete } from '../interface'

import { TodosService } from '../todos.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
  // providers: [TodosService] // 3. 将没有注册为提供商的服务 注册为组件级提供商 在组件及其子组件都可以使用
})
export class TodoComponent implements OnInit {
  // 导入服务后 在constructor中依赖注入服务（DI）会自动获得实例对象
  constructor(private todosService: TodosService) { }
  // 接口[] 表示数组中的每一项对象的约定
  todoList: TodoItem[]
  get watchTodoList() {
    window.localStorage.setItem('anglar-todoList', JSON.stringify(this.todoList))
    return window.localStorage.getItem('anglar-todoList')
  }
  add: Add = text => {
    this.todosService.add(text)
      .subscribe((res: TodoItem) => {
        this.todoList.push(res)
      })
  }
  del: Del = id => {
    this.todosService.del(id)
      .subscribe(res => {
        this.todoList = this.todoList.filter(v => v.id !== id)
      })
  }
  updateComplete: UpdateComplete = id => {
    const obj = this.todoList.find(v => v.id === id)
    this.todosService.updateComplete(id, obj.isComplete)
      .subscribe((res: TodoItem) => {
        obj.isComplete = !obj.isComplete
      })
  }
  // 子组件如何调用父组件的方法 input传回调 output绑定事件
  fatherMath = (...args: any) => {
    console.log('fatherMath', ...args)
  }

  ngOnInit() {
    this.todosService.getTodoList()
      .subscribe((res: TodoItem[]) => {
        this.todoList = res
      })
  }

}

// typescript 是js的超继集
// 类型注解 约定值的类型
// 接口 约定一个对象的成员类型
// 泛型 约定函数方法参数的类型
// 类的成员修饰符（public private）
