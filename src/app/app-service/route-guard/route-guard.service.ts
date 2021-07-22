import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SimpleAuthenticationService } from '../authentication/simple-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  loginStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService,
    private router: Router
  ) {
    this.simpleAuthenticationService.globalStateChanged.subscribe((state) => {
      this.loginStatus.next(state.loggedInStatus);
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginStatus.getValue() == false) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
