import { INavbarOption } from './../../interfaces/navbar-option.interface';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() navbarOptions: Array<INavbarOption> = new Array();

  constructor(
    private router: Router,
  ) { }

  navbarClick(option: INavbarOption): void {
    this.router.navigate([option.route]);
  }

}
