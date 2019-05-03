import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { NotfindComponent } from './notfind.component'

const routes: Routes = [{
  path: '', // path 仍会承接 上下文
  component: NotfindComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)], // 子路由使用 forChild
  exports: [RouterModule]
})
export class NotfindRoutingModule { }
