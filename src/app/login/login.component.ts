import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear()
  }

  userData:any;

  loginform = this.builder.group({
    username : this.builder.control('', Validators.required),
    password : this.builder.control('', Validators.required)
  })

   proceedlogin() {
    if (this.loginform.valid) {
    //   this.service.Proceedregister(this.loginform.value).subscribe((res:any)=>{
    //     this.toastr.success('Please contact admin for enable access','Registered successfully')
    //     this.router.navigate(['/login'])
    //   })
    // } else {
    //   this.toastr.warning('Please enter a vlaid data');
    // }
    this.service.Getbycode(this.loginform.value.username).subscribe((res:any)=>{
      this.userData = res
      console.log(this.userData)
      if(this.userData.password === this.loginform.value.password){
        if(this.userData.isactive){
          sessionStorage.setItem('username', this.userData.id);
          sessionStorage.setItem('userrole', this.userData.role);
          this.router.navigate([''])
        }else{
          this.toastr.error('Please contact admin','In Active User')
        }
      }else{
        this.toastr.error("Invalid credentials")
      }
    })
    }
  }
}
