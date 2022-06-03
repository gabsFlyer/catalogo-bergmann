import { User } from './shared/models/user.model';
import { Router } from '@angular/router';
import { INavbarOption } from './shared/interfaces/navbar-option.interface';
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

  navbarOptions: Array<INavbarOption> = new Array();


  constructor (
    private auth: AuthenticationService,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((logged: boolean) => {
      this.userIsLogged = logged;
      if (this.userIsLogged) {
        this.getNavbarOptions();
      }
    });
    this.auth.checkStatus();
  }

  getNavbarOptions() {
    this.auth.getUser()
      .subscribe((user: User) => {
        const userHierarchy = user.hierarchy;

        if (userHierarchy > 1) {

          this.navbarOptions = [
            {display: 'Sair', route: 'logout'}
          ]
        }
      });

  }

  logout(): void {
    this.router.navigate(['logout']);
  }
}
