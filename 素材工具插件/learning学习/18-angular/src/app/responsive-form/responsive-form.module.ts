import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ResponsiveFormRoutingModule } from './responsive-form-routing.module'

import { ResponsiveFormComponent } from './responsive-form.component'

@NgModule({
  declarations: [ResponsiveFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResponsiveFormRoutingModule
  ]
})
export class ResponsiveFormModule { }
