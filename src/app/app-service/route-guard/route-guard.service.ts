import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SimpleAuthenticationService } from '../authentication/simple-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loginStatus = this.simpleAuthenticationService.isUserLoggedIn();
    if (loginStatus == false) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
