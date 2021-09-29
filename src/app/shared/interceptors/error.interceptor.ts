import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { ErrorModalComponent } from 'src/app/shared/components/error-modal/error-modal.component';
import { ToastrService } from 'ngx-toastr';
import { lstat } from 'fs';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // bsModalRef: BsModalRef;

  constructor(
    private toasterService: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if ([400, 500].indexOf(error.status) !== -1) {
              if (request.url.indexOf('/o/token') >= 0) {
                return throwError(error);
              }

              // if (error.error.validationError) {
              //   const err = error.error.validationError;
              //   let lx: string[] = [];
              //   let i = 1;
              //   for (const [key, value] of Object.entries(err)) {
              //     lx.push(`${i}. ${value}`);
              //     ++i;
              //   }

              //   const s: string = lx.join('<br/>');
              //   this.toasterService.error(s, 'Invalid data', { enableHtml: true });
              //   // this.toasterService.error(s, 'Invalid data', { enableHtml: true, closeButton: true, timeOut: 0, extendedTimeOut: 0 });
              // }

              else if (error.error.message) {
                if (Array.isArray(error.error.message)) {
                  const s: string = error.error.message.join('<br/>');
                  this.toasterService.error(s, 'Invalid data', { enableHtml: true });
                }

                else {
                  this.toasterService.error(error.error.message);
                }
              }
            }

            else if (error.status === 404) {
              if (error.error.message) {
                this.toasterService.error('Not Found!', error.error.message);
              }

              else {
                this.toasterService.error('Not Found!', '404 - API not Found');
              }
            }
          }

          else if (error instanceof TimeoutError) {
            this.toasterService.error('API Request Timeout!', 'Timeout');
          }

          return throwError(error);
        })
      );
  }
}
