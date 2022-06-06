import { User } from './shared/models/user.model';
import { Router } from '@angular/router';
import { INavbarOption } from './shared/interfaces/navbar-option.interface';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Catálogo';
  userIsLogged: boolean = false;
  userIsAdmin: boolean = false;

  // navbarOptions: Array<INavbarOption> = new Array();


  constructor (
    private auth: AuthenticationService,
  ) {  }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((logged: boolean) => {
      this.userIsLogged = logged;
      if (this.userIsLogged) {
        this.checkIfUserIsAdmin();
      }
    });
    this.auth.checkStatus();
  }

  checkIfUserIsAdmin() {
    this.auth.getUser()
    .subscribe((user: User) => {
      this.userIsAdmin = user.hierarchy > 1;
    });
  }
}
