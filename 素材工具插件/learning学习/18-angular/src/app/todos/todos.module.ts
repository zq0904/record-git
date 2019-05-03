import { NgModule } from '@angular/core'
// CommonModule 这个模块 提供了如*ngIf等指令 BrowserModule 内部也是调用了CommonModule
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TodosRoutingModule } from './todos-routing.module'

import { TodoComponent } from './todo/todo.component'
import { TodoHeaderComponent } from './todo-header/todo-header.component'
import { TodoMainComponent } from './todo-main/todo-main.component'

// import { TodosService } from './todos.service'

@NgModule({
  declarations: [TodoComponent, TodoHeaderComponent, TodoMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    TodosRoutingModule
  ]
  // providers: [TodosService], // 2. 将没有提供商的服务 注册为 模块级提供商 也就意味着只能在模块内使用
})
export class TodosModule { }
