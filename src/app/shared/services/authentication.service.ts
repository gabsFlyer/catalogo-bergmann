import { User } from './../models/user.model';
import { IAccessToken } from './../interfaces/access-token.interface';
import { map, Observable } from 'rxjs';
import { SignInModel } from './../models/sign-in.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpoints } from '../constants/api-endpoints.constant';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(email: string, password: string): Observable<IAccessToken> {
    const url = apiEndpoints.auth.signIn;
    const signInModel = new SignInModel(email, password);

    return this.http
      .post(url, signInModel)
      .pipe(map(res => res as IAccessToken));
  }

  signUp(user: User) {
    const url = apiEndpoints.auth.signUp;

    return this.http
      .post(url, user)
      .pipe(map(res => res as IAccessToken));
  }

  refreshToken(): Observable<IAccessToken> {
    const url = apiEndpoints.auth.refreshToken;

    return this.http
      .post(url, null)
      .pipe(map(res => res as IAccessToken));
  }

  logout(): Observable<any> {
    const url = apiEndpoints.auth.logout;

    return this.http.post(url, null);
  }

  getUser(): Observable<User> {
    const url = apiEndpoints.auth.me;

    return this.http.post<User>(url, null);
  }

  userLogged() : boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(environment.sessionStorage.userToken);
  }

  setToken(token: string) {
    sessionStorage.setItem(environment.sessionStorage.userToken, token);
    sessionStorage.setItem(environment.sessionStorage.lastTokenRefresh, Date.now().toString());
  }

  shouldRefreshToken(): boolean {
    const lastTokenRefresh = sessionStorage.getItem(environment.sessionStorage.lastTokenRefresh);
    if (!lastTokenRefresh) {
      return true;
    }

    const lastTokenRefreshDate = new Date(lastTokenRefresh);
    const today = new Date();
    const daysToRefreshToken = environment.application.daysToRefreshToken;

    return (today.getDate() >= lastTokenRefreshDate.getDate() + daysToRefreshToken);
  }

  clearToken() {
    sessionStorage.removeItem(environment.sessionStorage.userToken);

    location.reload();
  }

}
