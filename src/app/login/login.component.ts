import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleAuthenticationService } from '../app-service/authentication/simple-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;
  errorMessage = '';

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleLogin() {
    this.simpleAuthenticationService.checkAuthCredentials(this.username, this.password)
      .subscribe(
        data => {
          if (data == true) {
            this.invalidLogin = false;
            this.errorMessage = '';
            this.router.navigate(['homepage', this.username]);
          } else {
            this.invalidLogin = true;
            this.errorMessage = 'Invalid Credentials !!';
            setTimeout(() => {
              this.invalidLogin = false;
            }, 3000);
          }
        });
  }

}
