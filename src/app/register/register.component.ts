import { Component, OnInit } from '@angular/core';
import { User } from '../app-model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  user = new User();

  constructor(
  ) { }

  ngOnInit() {
    this.user.isVeg = false;
  }

  registerUser() {
    
  }

}
