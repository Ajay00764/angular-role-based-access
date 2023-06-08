import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'angular-role-based-access';
  ismenurequired = false;
  isadminuser = false;

  constructor(private router: Router, private service: AuthService){}

  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl == '/login' || currenturl == '/register'){
      this.ismenurequired = false;
    }else{
      this.ismenurequired = true;
    }
    if(this.service.Getuserrole() === 'Admin'){
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }
  }

  
}
