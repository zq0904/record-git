import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable() // 模块级的 提供商 HttpClientModule模块在哪注入就在哪注入该服务
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set('Authorization', window.localStorage.getItem('hrm-token') || '')
    })
    return next.handle(request).pipe(
      tap(
        () => {}, // 成功回调
        err => { // 失败回调 做一些统一处理

        }
      )
    )
  }
}
