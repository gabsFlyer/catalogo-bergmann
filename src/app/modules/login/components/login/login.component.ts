import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  login() {
    console.log('userMail', this.userMail)
    console.log('userPassword', this.userPassword)
  }

}
