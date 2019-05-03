import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem, Del, UpdateComplete } from '../interface'

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.less']
})
export class TodoMainComponent implements OnInit {
  @Input()
  todoList: TodoItem[]
  // input 接受父组件方法回调 注意 父组件的方法的this
  @Input()
  del: Del
  @Input()
  updateComplete: UpdateComplete
  // output公开 自定义事件 父组件在子组件上绑定事件 子组件通过这个 自定义事件.emit(arguments)来调用父组件的方法
  @Output()
  fatherMath = new EventEmitter()

  trackByTodoList(index: number, item: TodoItem) {
    return item.id
  }

  constructor() { }

  ngOnInit() {
  }

}
