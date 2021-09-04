import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleAuthService } from '../authentication/simple-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuardService {

  fullName = new BehaviorSubject<string>(null);
  loginStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private simpleAuthService: SimpleAuthService,
    private router: Router
  ) {
    this.simpleAuthService.globalStateChanged.subscribe((state) => {
      this.fullName.next(state.fullName);
      this.loginStatus.next(state.loggedInStatus);
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginStatus.getValue() == true) {
      this.router.navigate(['homepage', this.fullName.getValue()]);
      return false;
    }
    return true;
  }
}
