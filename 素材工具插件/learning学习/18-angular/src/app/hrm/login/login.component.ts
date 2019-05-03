import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HrmService } from '../hrm.service'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private hrmService: HrmService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  loginForm: FormGroup

  submitForm(): void {
    for (const i of Object.keys(this.loginForm.controls)) {
      this.loginForm.controls[i].markAsDirty()
      this.loginForm.controls[i].updateValueAndValidity()
    }
    if (!this.loginForm.valid) return
    this.hrmService.login(this.loginForm.value)
      .subscribe(res => {
        if (res.status !== 1) {
          return this.message.create('error', '用户名或密码错误', {nzDuration: 2000})
        }
        window.localStorage.setItem('hrm-token', res.result.tokenType + ' ' + res.result.accessToken)
        this.router.navigate(['/hrm/home/employees'])
      })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,6}$/)]],
    })
  }
  get userNameErrorText() {
    if (this.loginForm.get('userName').hasError('required')) {
      return '请填写用户名'
    } else if (this.loginForm.get('userName').hasError('minlength') || this.loginForm.get('userName').hasError('maxlength')) {
      return '用户名需3-6位'
    }
  }
  get passwordErrorText() {
    if (this.loginForm.get('password').hasError('required')) {
      return '请填写密码'
    } else if (this.loginForm.get('password').hasError('pattern')) {
      return '密码需3-6位字母或数字'
    }
  }

}
