import { User } from './shared/models/user.model';
import { UrlTree } from '@angular/router';
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

  constructor (
    private auth: AuthenticationService,
  ) {  }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((logged: boolean | UrlTree) => {
      this.userIsLogged = logged === true;
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
