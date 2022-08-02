import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.auth.logout()
      .subscribe({
        next: res => this.logout(),
        error: err => this.logout(),
      });
  }

  logout() {
    this.auth.clearToken();
  }

}
