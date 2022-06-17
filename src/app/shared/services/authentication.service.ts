import { User } from './../models/user.model';
import { IAccessToken } from './../interfaces/access-token.interface';
import { map, Observable, ReplaySubject } from 'rxjs';
import { SignInModel } from './../models/sign-in.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpoints } from '../constants/api-endpoints.constant';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private logged = new ReplaySubject<boolean>(1);
  isLogged = this.logged.asObservable();

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

  getUser(): Observable<User> {
    const url = apiEndpoints.auth.me;

    return this.http.post<User>(url, null);
  }

  logout() {
    this.clearToken();
    this.checkStatus();
  }

  userLogged() : boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(environment.sessionStorage.userToken);
  }

  setToken(token: string) {
    sessionStorage.setItem(environment.sessionStorage.userToken, token);
    this.logged.next(true);
  }

  clearToken() {
    sessionStorage.removeItem(environment.sessionStorage.userToken);
  }

  checkStatus() {
    if (this.getToken()) {
      this.logged.next(true);
    } else {
      this.logged.next(false);
    }
  }
}
