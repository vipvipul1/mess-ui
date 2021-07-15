import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app-model/user.model';
import { UserRegisterService } from '../app-service/authentication/user-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMsg = '';
  successMsg = '';
  emailErr: boolean = false;
  usernameErr = false;
  phoneErr = false;
  studentIdErr = false;
  user = new User();

  constructor(
    private userRegister: UserRegisterService
  ) { }

  ngOnInit() {
    this.user.isVeg = false;
  }

  validateRegDetails(userDetail) {
    this.userRegister.validateRegDetails(userDetail).subscribe(
      (res) => {
        return res;
      }, (err) => {
        this.errorMsg = err.error.friendlyMessage;
        return true;
      }
    );
  }

  registerUser() {
    this.user.userId = -1;
    this.userRegister.registerNewUser(this.user).subscribe(
      (res) => {
        this.successMsg = 'User registered successfully!';
        this.errorMsg = '';
        this.user = new User();
      }, (err) => {
        this.errorMsg = 'User registration failed!\n' + err.error.friendlyMessage;
        this.successMsg = '';
      }
    );
  }

}
