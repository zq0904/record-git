import { Component } from '@angular/core'

@Component({ // Component注解 将AppComponent 修饰为 组件
  selector: 'app-root', // 组件名 angular中默认的组建名都带有app-
  // template: '<div>内联模板<div>', // 如果组价的模板比较小也可以直接使用内联模板
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

}
