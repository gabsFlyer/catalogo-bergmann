import { User } from './shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { IAccessToken } from './shared/interfaces/access-token.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Catálogo';

  userIsLogged: boolean = false;
  userIsAdmin: boolean = false;
  loadingUser: boolean = false;

  constructor (
    private auth: AuthenticationService,
  ) {  }

  ngOnInit(): void {
    this.loadingUser = true;

    if (this.auth.userLogged()) {
      if (this.auth.shouldRefreshToken()) {
        this.auth.refreshToken()
          .subscribe((accessToken: IAccessToken) => {
            this.auth.setToken(accessToken.access_token);
            this.userIsLogged = true;

            this.checkIfUserIsAdmin();
        });
      } else {
        this.userIsLogged = true;
        this.checkIfUserIsAdmin();
      }
    }
  }

  checkIfUserIsAdmin() {
    this.auth.getUser()
      .subscribe((user: User) => {
        this.userIsAdmin = user.hierarchy > 1;

        this.loadingUser = false;
      });
  }
}
