import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NotfindRoutingModule } from './notfind-routing.module'

import { NotfindComponent } from './notfind.component' // 路由懒加载 加载这个模块 会调用组件 必须声明导出

@NgModule({
  declarations: [NotfindComponent], // 路由懒加载 加载这个模块 会调用组件 必须声明导出
  imports: [
    CommonModule,
    NotfindRoutingModule
  ]
})
export class NotfindModule { }
