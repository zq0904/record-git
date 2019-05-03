import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms' // 导入响应式表单 控件

@Component({
  selector: 'app-responsive-form',
  templateUrl: './responsive-form.component.html',
  styleUrls: ['./responsive-form.component.less']
})
export class ResponsiveFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  // .value值 .setValue设置值 .dirty是否编辑过 .errors没有错误为null 有错误为错误对象 .hasError(规则)单独获取某一项规则是否有错误
  name = new FormControl('', [Validators.required, this.customValidator])
  password = new FormControl('', [Validators.required])

  // 使用表单组
  // loginForm = new FormGroup({
  //   useName: new FormControl('', [Validators.required]),
  //   usePassword: new FormControl('', [Validators.required])
  // })
  // 简洁写法
  loginForm = this.formBuilder.group({
    useName: ['', Validators.required],
    usePassword: ['', Validators.required],
  })

  handleSubmit = () => {
    if (!this.loginForm.valid) return
    console.log('校验通过值为：', this.loginForm.value)
  }

  // 自定义验证器 是一个方法 验证成功返回null 验证失败返回自定义的错误对象 {'xxx': true}
  customValidator(control: AbstractControl) {
    console.log(control)
    if (!/^[a-zA-Z0-9]{6,}$/.test(control.value)) {
      return { customError: true }
    }
    return null
  }

  ngOnInit() {
  }

}
