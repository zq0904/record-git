import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DirComponent } from './dir/dir.component'
import { BaseComponent } from './base/base.component'
import { AComponent } from './base/a/a.component'

export const routes: Routes = [{
  path: '',
  redirectTo: '/dir',
  pathMatch: 'full' // 默认 prefix 类似精确模式
}, {
  path: 'dir',
  component: DirComponent
}, {
  path: 'base/:id',
  component: BaseComponent,
  children: [{ // 子路由
    path: '', // 默认匹配
    component: AComponent
  }]
}, {
  path: 'todos',
  loadChildren: './todos/todos.module#TodosModule'
}, {
  path: 'responsive-form', // nagular内置相应表单
  loadChildren: './responsive-form/responsive-form.module#ResponsiveFormModule'
}, { // 人力资源管理项目路由
  path: 'hrm',
  loadChildren: './hrm/hrm.module#HrmModule'
}, {
  path: '**',
  loadChildren: './notfind/notfind.module#NotfindModule' // 路由懒加载
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 服务应该是单例的 路由懒加载等情况会破坏这种单例 使用forRoot主要是为了 保证一个项目中只有一个roouter服务（单例）
  exports: [RouterModule] // RouterModule 提供了如 router-outlet组件 根模块根组件中要想使用 这里必须导出
})
export class AppRoutingModule { }
