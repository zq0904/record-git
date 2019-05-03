import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Token, Employees } from './api'
import { Login } from './hrm.type'
import { Employeeslist } from './home/employees/employees.type'

@Injectable({
  providedIn: 'root'
})
export class HrmService {
  login(arg: Login) {
    return this.http.post<any>(Token, arg)
  }
  checkLogin() {}
  logout() {
    return this.http.delete<any>(Token, {
      headers: {
        Authorization: window.localStorage.getItem('hrm-token')
      }
    })
  }
  getEmployees(page: number, limit: number) {
    return this.http.get<any>(Employees + `?_page=${page}&_limit=${limit}`, {
      observe: 'response'
    })
  }
  delEmployees(id: number) {
    return this.http.delete(Employees + '/' + id)
  }
  addEmployees(obj: Employeeslist) {
    return this.http.post(Employees, obj)
  }
  patchEmployees(id: number, obj: Employeeslist) {
    return this.http.patch<Employeeslist>(Employees + '/' + id, obj)
  }

  constructor(private http: HttpClient) { }
}
