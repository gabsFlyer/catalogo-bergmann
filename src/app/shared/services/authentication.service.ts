import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

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
