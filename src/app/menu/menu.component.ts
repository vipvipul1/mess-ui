import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { SimpleAuthenticationService } from '../app-service/authentication/simple-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterContentChecked{

  fullName = '';

  constructor(
    public simpleAuthenticationService: SimpleAuthenticationService
  ) { }

  ngAfterContentChecked(): void {
    this.fullName = this.simpleAuthenticationService.getAuthenticatedFullname();
  }

  ngOnInit() {
  }

}
