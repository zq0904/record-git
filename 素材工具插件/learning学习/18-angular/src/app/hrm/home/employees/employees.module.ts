import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EmployeesRoutingModule } from './employees-routing.module'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { ReactiveFormsModule } from '@angular/forms'

import { AddComponent } from './add/add.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class EmployeesModule { }
