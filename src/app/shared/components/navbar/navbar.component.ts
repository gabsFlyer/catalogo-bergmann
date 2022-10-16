import { environment } from 'src/environments/environment';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from '../../constants/routes.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  routes = RoutesConstant;
  applicationName: string = environment.application.name;

  @Input() userIsAdmin: boolean = false;

  constructor(
    private router: Router,
  ) { }

  redirectTo(route: String): void {
    this.router.navigate([route]);
  }
}
