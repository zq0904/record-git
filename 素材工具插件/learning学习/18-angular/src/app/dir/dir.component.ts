import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router'

@Component({
  selector: 'app-dir',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.less']
})
export class DirComponent implements OnInit {

  constructor(private router: Router) { }
  routes = this.router.config
  trackByToRoute(index: number, item: Route) {
    return item.path || ''
  }
  ngOnInit() {
  }

}
