import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/user'

  GetAll() {
    return this.http.get(this.apiurl)
  }

  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code)
  }

  GetCustomerById(id:any){
    return this.http.get("http://localhost:3000/customers/" + id)
  }

  UpdateCustomer(id:any, data:any){
    return this.http.put(`http://localhost:3000/customer/${id}`, data)
  }

  Proceedregister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }

  Updateuser(code: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + code, inputdata)
  }

  IsloggedIn(){
    return sessionStorage.getItem('username') != null;
  }

  GetAllRole(){
    return this.http.get("http://localhost:3000/role")
  }

  Getuserrole(){
    return sessionStorage.getItem('userrole') != null? sessionStorage.getItem('userrole')?.toString():''
  }

  getrole(){
    return sessionStorage.getItem('role') != null? sessionStorage.getItem('role')?.toString():'';
  }

  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer')
  }

  Getaccessbyrole(role:any, menu:any){
    return this.http.get(`http://localhost:3000/roleaccess?role=${role}&menu=${menu}`)
  }

  RemoveCustomer(id:any){
    return this.http.delete('http://localhost:3000/customer/' + id)
  }

  AddCustomer(data:any){
    return this.http.post('http://localhost:3000/customer', data)
  }
}
