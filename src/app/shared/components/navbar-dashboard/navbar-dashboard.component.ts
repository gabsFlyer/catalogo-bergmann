import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from '../../constants/routes.constant';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css']
})
export class NavbarDashboardComponent {
  routes = RoutesConstant;

  constructor(
    private router: Router,
  ) { }

  redirectTo(route: String): void {
    this.router.navigate([route]);
  }
}
