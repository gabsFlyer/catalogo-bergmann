import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class UnprocessableEntityInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
  ) {}

  private handleUnprocessableEntityError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 422 && err.error.errors) {
      if (Object.entries(err.error.errors).length > 0) {
        const firstError = Object.entries(err.error.errors)[0][1];
        const stringError = new String(firstError);

        this.toastr.error(stringError.toString());
      }
    }

    return throwError(() => err);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(x => this.handleUnprocessableEntityError(x)));
  }
}
