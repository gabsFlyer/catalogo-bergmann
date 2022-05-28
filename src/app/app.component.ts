import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Catálogo';
  userLogged: boolean = false;

  constructor (
    private authenticationService: AuthenticationService
  ) {  }

  ngOnInit(): void {
    this.userLogged = this.authenticationService.userLogged();
  }

  logout(): void {
    this.authenticationService.clearToken();
    this.userLogged = this.authenticationService.userLogged();
  }
}
