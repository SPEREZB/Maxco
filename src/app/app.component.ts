import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private loginService:LoginService) {}

  title = 'MAXCO';

  isLogin=false; 
  isMenu:boolean=false;
  hideLogin: boolean = false;
  hideMenu = false

  ngOnInit(): void { 
    this.initVariables();
    this.verifyToken();
  }

  verifyToken()
  {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogin = true;
      this.hideLogin = true;
      this.isMenu = true; 
    }else
    {
      this.router.navigate(['/login']); 
    }
  }

  initVariables()
  {
    this.loginService.getIsLogin().subscribe((value: boolean) => (this.isLogin = value));
    this.loginService.getIsMenu().subscribe((value: boolean) => (this.isMenu = value));
    this.loginService.getHideLogin().subscribe((value: boolean) => (this.hideLogin = value));
    this.loginService.getHideMenu().subscribe((value: boolean) => (this.hideMenu = value));
  }
   
   toggleLogin() {
    this.isLogin = !this.isLogin;
  } 

  onLogin() {
    this.loginService.onLogin();
  }
 
  onLogout() { 
    this.loginService.logout();
  }
}
