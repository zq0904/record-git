import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { HrmService } from '../hrm.service'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private hrmService: HrmService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) { }

  isCollapsed = false
  pathname = window.location.pathname

  private initialSidebarData = [{
    title: '员工管理',
    open: false,
    chilren: [{
      text: '员工列表',
      routerLink: '/hrm/home/employees',
      selected: false
    }, {
      text: '员工添加',
      routerLink: '/hrm/home/employees/add',
      selected: false
    }]
  }, {
    title: '角色管理',
    open: false,
    chilren: [{
      text: '角色列表',
      routerLink: '/hrm/home/role/list',
      selected: false
    }, {
      text: '角色添加',
      routerLink: '/hrm/home/role/add',
      selected: false
    }]
  }, {
    title: '权限管理',
    open: false,
    chilren: [{
      text: '权限列表',
      routerLink: '/hrm/home/permissions/list',
      selected: false
    }, {
      text: '权限添加',
      routerLink: '/hrm/home/permissions/add',
      selected: false
    }]
  }]
  sidebarData = []

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>你确定要退出登录吗?</i>',
      nzContent: '',
      nzOnOk: () => this.logout()
    })
  }
  logout(): void {
    this.hrmService.logout()
      .subscribe(res => {
        if (res.status !== 1) {
          return this.message.create('warning', '用户退出失败，请重新尝试', {nzDuration: 2000})
        }
        window.localStorage.removeItem('hrm-token')
        this.router.navigate(['/hrm'])
      }, err => {
        this.message.create('warning', '用户退出失败，请重新尝试', {nzDuration: 2000})
      })
  }
  // 侧边栏 高亮 及 默认展开
  handleSidebar() {
    // 这里应该想办法 拿到全的路由表 this.router
    // 这里为了简单先写死 this.sidebarData
    this.sidebarData = JSON.parse(JSON.stringify(this.initialSidebarData))
    for (const v of this.sidebarData) {
      for (const item of v.chilren) {
        if (item.routerLink === this.pathname) {
          item.selected = true
          v.open = true
        }
      }
    }
  }
  // 动态的面包屑
  get breadcrumb() {
    let arr = this.pathname.replace('/hrm/home/', '').split('/')
    arr = arr.length === 1 && arr[0] === 'employees' ? ['employees', 'list'] : arr
    return arr
  }
  handleClick() {
    // angular中我没有找到 $nextTick的替代品
    setTimeout(() => {
      this.pathname = window.location.pathname
    }, 0)
  }
  trackByToSidebar(index, item) {
    return item.title
  }
  trackByToChilren(index, item) {
    return item.routerLink
  }
  // 监听路由改变重新计算 高亮 及 选中
  subscribeRouter() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.pathname = window.location.pathname
          this.handleSidebar()
        }
      })
  }
  ngOnInit() {
    this.handleSidebar()
    this.subscribeRouter()
  }
}
