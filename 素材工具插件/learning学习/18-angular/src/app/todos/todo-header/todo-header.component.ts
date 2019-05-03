import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.less']
})
export class TodoHeaderComponent implements OnInit {
  constructor() { }

  @Output()
  add = new EventEmitter<string>()
  val: string // 在赋值语句中 ts可以推断出 类型 不用再去写注解

  handleAdd(e) {
    e.preventDefault()
    const text = this.val.trim()
    if (text === '') return
    this.add.emit(text)
    this.val = ''
  }

  ngOnInit() {
  }

}
