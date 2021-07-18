import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SimpleAuthenticationService } from '../authentication/simple-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuardService {

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loginStatus = this.simpleAuthenticationService.isUserLoggedIn();
    if (loginStatus == true) {
      this.router.navigate(['homepage', this.simpleAuthenticationService.getAuthenticatedFullname()]);
      return false;
    }
    return true;
  }
}
