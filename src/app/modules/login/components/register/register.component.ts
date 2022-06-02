import { ToastrService } from 'ngx-toastr';
import { IApiError } from './../../../../shared/interfaces/api-error.interface';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from './../../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccessToken } from 'src/app/shared/interfaces/access-token.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((logged: boolean) => {
      this.router.navigate(['dashboard']);
    });

    this.auth.checkStatus();
  }

  register() {
    console.log(this.user);
    this.auth.signUp(this.user)
      .subscribe({
        next: (accessToken: IAccessToken) => {
          this.auth.setToken(accessToken.access_token);

          this.router.navigate(['dashboard']);
        },
        error: (errorResponse) => {
          const apiError: IApiError = errorResponse.error;

          this.toastr.error(apiError.message);
        }
      });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
