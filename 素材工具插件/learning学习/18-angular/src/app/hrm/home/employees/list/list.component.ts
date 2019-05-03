import { Component, OnInit } from '@angular/core'

import { HrmService } from '../../../hrm.service'
import { Employeeslist } from '../employees.type'
import { NzMessageService } from 'ng-zorro-antd'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(
    private hrmService: HrmService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder,
  ) {}

  page = 1
  limit = 5
  total = 0
  listData: Employeeslist[] = [] // 对于复杂类型 类型推断是不起作用的
  loading = false

  isVisible = false
  modifyId = null
  validateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
    gender: ['1', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^0?(13|15|18|14|17)[0-9]{9}$/)]],
    addDate: ['', [this.customDate]],
  })

  // 后获取列表数据
  getDate() {
    this.loading = true
    this.hrmService.getEmployees(this.page, this.limit)
      .subscribe(res => {
        // json-server 分页数据总数是放到了 header响应头中
        this.total = +res.headers.get('X-Total-Count')
        this.listData = res.body
        this.loading = false
      })
  }
  trackByToTable(index: number, item: Employeeslist) { return item.id }
  // 删除操作
  confirm(id: number): void {
    this.hrmService.delEmployees(id)
      .subscribe(res => {
        this.page = 1 // 为了防止 最后一页没有数据
        this.getDate()
        this.nzMessageService.create('success', '删除成功')
      })
  }
  // 修改 展示模态框
  showModal(obj: Employeeslist): void {
    const { id , ...args } = obj
    this.modifyId = id
    this.resetForm({
      ...args,
      gender: args.gender + '',
      addDate: new Date(args.addDate)
    })
    this.isVisible = true
  }
  // 模态框 取消
  handleCancel(): void {
    this.isVisible = false
    this.resetForm()
  }
  // 日期 自定义 校验规则
  customDate(control: FormControl) {
    const value = control.value
    if (value && value.getTime() > Date.now()) {
      return { customDate: true }
    }
  }
  // 重置表单 初始表单默认值
  resetForm(obj?: any): void {
    this.validateForm.reset(obj)
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsPristine()
      this.validateForm.controls[key].updateValueAndValidity()
    }
  }
  // 模态框 确认 提交表单
  submitForm = () => {
    const value = this.validateForm.value
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
    this.hrmService.patchEmployees(this.modifyId, obj)
      .subscribe(res => {
        // 按照 Angular 的设计，当需要对 nzData 中的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效
        const index = this.listData.findIndex(v => v.id === this.modifyId)
        this.listData.splice(index, 1, res)
        this.listData = [...this.listData]
        this.nzMessageService.create('success', '修改成功')
        this.resetForm()
        this.isVisible = false
      })
  }
  ngOnInit() {
    this.getDate()
  }

}
