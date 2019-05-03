import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-notfind',
  templateUrl: './notfind.component.html',
  styleUrls: ['./notfind.component.less']
})
export class NotfindComponent implements OnInit {

  constructor(private router: Router) { }

  time = 5
  timeId: any

  ngOnInit() {
    this.timeId = setInterval(() => {
      --this.time
      if (this.time === 0) {
        clearInterval(this.timeId)
        this.router.navigate(['/dir'])
      }
    }, 1000)
  }

}
