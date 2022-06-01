import { IAccessToken } from './../interfaces/access-token.interface';
import { map, Observable } from 'rxjs';
import { SignInModel } from './../models/sign-in.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  signUp() {

  }

  logout() {

  }

  userLogged() : boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(environment.sessionStorage.userToken);
  }

  setToken(token: string) {
    sessionStorage.setItem(environment.sessionStorage.userToken, token);
  }

  clearToken() {
    sessionStorage.removeItem(environment.sessionStorage.userToken);
  }
}
