import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleAuthenticationService } from '../app-service/authentication/simple-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterContentChecked{

  fullName = '';
  loginStatus = new BehaviorSubject<boolean>(null);

  constructor(
    public simpleAuthenticationService: SimpleAuthenticationService
  ) { }

  ngOnInit() {
    this.simpleAuthenticationService.globalStateChanged.subscribe((state) => {
      this.loginStatus.next(state.loggedInStatus);
      console.log(this.loginStatus.getValue());
    });
  }

  ngAfterContentChecked(): void {
    this.simpleAuthenticationService.getAuthFullname().subscribe((response) => {
      this.fullName = response;
    });
  }

}
