import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class PreventDuplicateRequestsInterceptor implements HttpInterceptor {

  private ongoingRequests: Set<string> = new Set();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.ongoingRequests.has(request.url)) {
      return Observable.create((observer: { complete: () => void; }) => {
        observer.complete(); 
      });
    }

    this.ongoingRequests.add(request.url);
    return next.handle(request).pipe(
      finalize(() => this.ongoingRequests.delete(request.url))
    );
  }
}
