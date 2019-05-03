import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ResponsiveFormComponent } from './responsive-form.component'

const routes: Routes = [{
  path: '',
  component: ResponsiveFormComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsiveFormRoutingModule { }
