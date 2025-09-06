import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import alertas from '../utilities/Alert';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class Error404Interceptor implements HttpInterceptor {

  constructor(private router: Router, private loginService:LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 404) {
          alertas("Error", "Su solicitud obtuvo un error 404", "error");
        }
         else if (error.status === 401) { 
          alertas("Error", "Su sesión expiro", "error");
          this.loginService.logout();
        } 
         else if (error.status === 500) { 
          alertas("Error", "Hubo un fallo en su solicitud", "error");

        } else if (error.status === 403) { 
          alertas("Error", "Acceso denegado", "error");

        } else {
          
          alertas("Error", "Hubo un error inesperado", "error");
        }
        throw error;
      })
    );
  } 
}
