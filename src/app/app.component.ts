import { Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title: string = 'Catálogo';
  userLogged: boolean = false;

  constructor (
    private auth: AuthenticationService,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((logged: boolean) => {
      this.userLogged = logged;
    });
    this.auth.checkStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('passou aqui')
    // this.userLogged = this.authenticationService.userLogged();
  }

  logout(): void {
    this.auth.logout();

    this.router.navigate(['login']);
  }
}
