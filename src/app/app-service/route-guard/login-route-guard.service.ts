import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SimpleAuthenticationService } from '../authentication/simple-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuardService {

  fullName = '';
  loginStatus = false;

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService,
    private router: Router
  ) {
    this.simpleAuthenticationService.getAuthFullname().subscribe((response) => {
      this.fullName = response;
    });
    this.simpleAuthenticationService.globalStateChanged.subscribe((state) => {
      this.loginStatus = state.loggedInStatus;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginStatus == true) {
      this.router.navigate(['homepage', this.fullName]);
      return false;
    }
    return true;
  }
}
