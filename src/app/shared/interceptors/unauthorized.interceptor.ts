import { apiEndpoints } from 'src/app/shared/constants/api-endpoints.constant';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.toastr.error('Usuário deslogado');

      this.auth.logout()
        .subscribe({
          next: res => this.logout(),
          error: err => this.logout()
        })
    }
    return throwError(() => err);
  }

  private handleSignInError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 && err.error.error) {
      this.toastr.error(err.error.error);
    }
    return throwError(() => err);
  }

  private logout(): void {
    this.auth.clearToken();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === apiEndpoints.auth.signIn) {
      return next.handle(request).pipe(catchError(x => this.handleSignInError(x)));
    }

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
}
