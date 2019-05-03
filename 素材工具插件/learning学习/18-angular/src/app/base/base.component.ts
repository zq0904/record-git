import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less']
})
export class BaseComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) { }

  title = 'angular'
  url = 'https://www.baidu.com'
  value = '默认值'
  boolean = true
  arr = [{
    id: 1,
    text: '文本1'
  }, {
    id: 2,
    text: '文本2'
  }]
  handleClick(e) {
    e.preventDefault()
    console.log(e)
    this.boolean = !this.boolean
  }
  modifyArr() {
    // angular中 对 arr[index] = 的方式任然有效 push splice 都有效
    this.arr[1] = {
      id: 3,
      text: '文本3'
    }
  }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(res => {
        console.log('动态路由参数：', res)
      })
    this.activatedRoute.queryParams
      .subscribe(res => {
        console.log('查询字符串：', res)
      })
  }

}
