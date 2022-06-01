import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccessToken } from 'src/app/shared/interfaces/access-token.interface';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn: boolean = true;

  userMail: string = '';
  userPassword: string = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  login() {
    this.auth.signIn(this.userMail, this.userPassword)
      .subscribe((accessToken: IAccessToken) => {
        this.auth.setToken(accessToken.access_token);

        this.router.navigate(['dashboard']);
      });
  }

}
