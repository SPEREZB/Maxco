import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoginSubject = new BehaviorSubject<boolean>(false);
  private isMenuSubject = new BehaviorSubject<boolean>(false);
  private hideLoginSubject = new BehaviorSubject<boolean>(false);
  private hideMenuSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private localStorageService:LocalstorageService) {}
 
  getIsLogin() {
    return this.isLoginSubject.asObservable();
  }

  getIsMenu() {
    return this.isMenuSubject.asObservable();
  }

  getHideLogin() {
    return this.hideLoginSubject.asObservable();
  }

  getHideMenu() {
    return this.hideMenuSubject.asObservable();
  }

  onLogin() { 
    this.isLoginSubject.next(true); 
    this.hideMenuSubject.next(true);
    this.isMenuSubject.next(true);
    setTimeout(() => {
      this.hideLoginSubject.next(true);

    }, 1800); 

    if(this.localStorageService.getItem("rol")=="ADMIN")
      this.router.navigate(['/usuarios']);  
    else if(this.localStorageService.getItem("rol")=="VND") 
      this.router.navigate(['/ventas']); 
  }
 
  logout(): void {
    this.isMenuSubject.next(false);
    this.hideLoginSubject.next(false);
    this.isLoginSubject.next(false);

    setTimeout(() => {
      this.hideMenuSubject.next(false);
    }, 300);
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
