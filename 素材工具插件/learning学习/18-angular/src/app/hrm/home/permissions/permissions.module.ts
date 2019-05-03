import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PermissionsRoutingModule } from './permissions-routing.module'
import { ListComponent } from './list/list.component'
import { AddComponent } from './add/add.component'

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule
  ]
})
export class PermissionsModule { }
