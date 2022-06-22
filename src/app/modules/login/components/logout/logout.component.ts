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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.logout();
    this.router.navigate([RoutesConstant.auth.login]);
  }

}
