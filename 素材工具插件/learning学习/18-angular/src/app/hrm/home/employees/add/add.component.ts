import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HrmService } from '../../../hrm.service'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private hrmService: HrmService,
    private router: Router,
    private nzMessageService: NzMessageService
  ) {}

  validateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
    gender: ['1', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^0?(13|15|18|14|17)[0-9]{9}$/)]],
    addDate: ['', [this.customDate]],
  })

  // 日期 自定义 校验规则
  customDate(control: FormControl) {
    const value = control.value
    if (value && value.getTime() > Date.now()) {
      return { customDate: true }
    }
  }

  resetForm(e?: MouseEvent): void {
    e && e.preventDefault()
    this.validateForm.reset({
      gender: '1' // 重置方法可以 设置默认值
    })
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsPristine()
      this.validateForm.controls[key].updateValueAndValidity()
    }
  }

  submitForm = ($event: any, value: any) => {
    $event.preventDefault()
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty()
      this.validateForm.controls[key].updateValueAndValidity()
    }
    if (!this.validateForm.valid) return
    const obj = {
      ...value,
      gender: +value.gender,
      phone: value.phone,
      addDate: value.addDate ? +value.addDate : Date.now(),
    }
    this.hrmService.addEmployees(obj)
      .subscribe(res => {
        this.resetForm()
        this.nzMessageService.create('success', '添加成功')
        this.router.navigate(['/hrm/home/employees'])
      })
  }

  ngOnInit() {
  }

}
