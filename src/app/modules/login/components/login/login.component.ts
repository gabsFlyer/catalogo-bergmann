import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { IAccessToken } from 'src/app/shared/interfaces/access-token.interface';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userMail: string = '';
  userPassword: string = '';
  applicationName: string = environment.application.name;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.auth.userLogged()) {
      this.router.navigate([RoutesConstant.dashboard.home]);
    }
  }

  goToRegister() {
    this.router.navigate([RoutesConstant.auth.register]);
  }

  login() {
    this.auth.signIn(this.userMail, this.userPassword)
      .subscribe((accessToken: IAccessToken) => {
        this.auth.setToken(accessToken.access_token);
      });
  }

}
