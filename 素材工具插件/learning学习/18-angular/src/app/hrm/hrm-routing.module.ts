import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './auth.guard' // 导入路由守卫

import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [{
  path: '',
  component: LoginComponent,
}, {
  path: 'home', // 每个routing 的第一层 path 都会拼接base路径
  component: HomeComponent,
  canActivate: [AuthGuard], // 应用守卫
  children: [{
    path: 'employees', // 这里也不能加 /
    loadChildren: './home/employees/employees.module#EmployeesModule'
  }, {
    path: 'role',
    loadChildren: './home/role/role.module#RoleModule'
  }, {
    path: 'permissions',
    loadChildren: './home/permissions/permissions.module#PermissionsModule'
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
