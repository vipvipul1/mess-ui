import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SimpleAuthService } from '../authentication/simple-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  loginStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private simpleAuthService: SimpleAuthService,
    private router: Router
  ) {
    this.simpleAuthService.globalStateChanged.subscribe((state) => {
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
