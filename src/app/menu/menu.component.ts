import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleAuthService } from '../app-service/authentication/simple-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterContentChecked{

  fullName = new BehaviorSubject<string>(null);
  loginStatus = new BehaviorSubject<boolean>(null);

  constructor(
    public simpleAuthService: SimpleAuthService
  ) { }

  ngOnInit() {
    this.simpleAuthService.globalStateChanged.subscribe((state) => {
      this.loginStatus.next(state.loggedInStatus);
    });
  }

  ngAfterContentChecked(): void {
    this.simpleAuthService.globalStateChanged.subscribe((state) => {
      this.fullName.next(state.fullName);
    });
  }

}
