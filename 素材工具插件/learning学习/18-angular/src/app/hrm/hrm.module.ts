import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { HrmRoutingModule } from './hrm-routing.module'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd' // 在某个模块中antd还需引入 因为 模块使用模块中的组件

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HrmRoutingModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  exports: [LoginComponent, HomeComponent]
})
export class HrmModule { }
