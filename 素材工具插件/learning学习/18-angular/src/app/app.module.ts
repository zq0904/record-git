import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './hrm/http.interceptor'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// 在根目录下
// 创建模块 npx ng g m modulename
// 创建服务 npx ng g s componentname | modulename/servename
// 创建组件 npx ng g c componentname | modulename/componentname
// 创建路由模块 npx ng g m routingmodulename --flat --module=app （--flat 在src/app下创建文件 而不是目录 --module=app 将模块注入到app.module中）
// 创建啊路由模块和模块 npx ng g m modulename/modulename --routing （--routing创建路由模块 顺带创建模块）
// 创建路由守卫 npx ng g guard componentname | modulename/guardnames

import { AppComponent } from './app.component'
import { DirComponent } from './dir/dir.component'
import { BaseComponent } from './base/base.component'
import { AComponent } from './base/a/a.component'

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd' // npx ng add ng-zorro-antd
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'

registerLocaleData(zh)

@NgModule({ // NgModule注解 将AppModule 解析为模块
  declarations: [ // 声明 该模块所拥的组件
    AppComponent,
    DirComponent,
    BaseComponent,
    AComponent,
  ],
  imports: [ // 该模块所依赖的模块
    BrowserModule, // 浏览器模块 主要作用 是将根模块渲染到页面中
    HttpClientModule, // 发请求模块
    AppRoutingModule, // 根路由模块
    FormsModule, // 这个模块提供了ngModel指令 必须在模块中导入才能在组件中使用
    ReactiveFormsModule, // 响应式表单模块
    // TodosModule, // (非懒加载模式) 一个模块 想要使用另一个模块中的组件 首先要引入这个模块 被引入的模块还必须导出相关组件 （组要是便于重构 清晰的看出一个模块中那些组件被外部使用了） (如果通过路由方式使用的组件不需要模块导出)
    NgZorroAntdModule,
    BrowserAnimationsModule,
  ],
  providers: [ // 该模块的服务
    { provide: NZ_I18N, useValue: zh_CN }, // antd语言
    { // ！！！添加自定义的拦截器 通添加的模块是 HttpClientModule 注入的那个模块也就是根模块
      provide: HTTP_INTERCEPTORS, // HTTP_INTERCEPTORS所有拦截器数组
      useClass: AuthInterceptor,
      multi: true // 标识可能有多项
    }
  ],
  bootstrap: [AppComponent], // 指定根模块 只有根模块需要配置 将组件插入到index.html中
  // exports: [], // 该模块需要公开的内容
})
export class AppModule { }

// 每个angular应用 至少有一个模块 根模块
// 根模块作用 启动应用
// 模块是 独立 封闭的
// 模块之间的引用 通过导入导出来完成
// 一个模块中 有 组价 服务 指令
