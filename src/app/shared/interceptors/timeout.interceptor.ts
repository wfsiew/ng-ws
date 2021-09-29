import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { AppConstant } from 'src/app/shared/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class HttpTimeoutInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      timeout(AppConstant.NETWORK_TIMEOUT)
    )
    .pipe(
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(error);
        }

        else if (error instanceof HttpErrorResponse) {
          return throwError(error);
        }

        return throwError(error);
      })
    );
  }
}
