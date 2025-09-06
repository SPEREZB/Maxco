import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import alertas from '../utilities/Alert';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  private readonly TIMEOUT = 10000; // 10 segundos

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(this.TIMEOUT),
      catchError(error => {
        if (error.name === 'TimeoutError') {
          alertas("Error", "La solicitud ha tardado demasiado", "error");

          return throwError('La solicitud ha tardado demasiado.');
        }
        return throwError(error);
      })
    );
  }
}
