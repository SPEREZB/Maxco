import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const token = localStorage.getItem('token'); 

  if (token) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false; 
  }
};

export const guestGuard: CanActivateFn=() =>{  
  const router = inject(Router); 
  const token = localStorage.getItem('token'); 
  const authService = inject(LoginService);


  if (token) { 
    authService.onLogin(); 
    return false;
  }
  return true;
};