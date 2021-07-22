import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ObservableStore } from '@codewithdan/observable-store';

import { API_URL } from 'src/app/app.constants';
import { User } from 'src/app/app-model/user.model';
import { StoreState } from 'src/app/interfaces/store-state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService extends ObservableStore<StoreState> {

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private username = new BehaviorSubject<string>(null);
  private fullName = new BehaviorSubject<string>(null);
  private userRole = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
  ) {
    super({ logStateChanges: true, trackStateHistory: true })

    this.loginStatus.subscribe((result) => {
      this.setState({ loggedInStatus: result }, "LOGGED_IN_STATUS");
    });
  }

  checkAuthCredentials(username, password) {
    return this.http.post(`${API_URL}/mess/login/user`, { 'username': username, 'password': password })
      .pipe(
        map(
          (data: User) => {
            if (data != null) {
              sessionStorage.setItem('loginStatus', '1');
              this.loginStatus.next(true);
              this.username.next(data.username);
              this.fullName.next(data.name);
              this.userRole.next(data.roleId)
              return data;
            }
            return data;
          })
      );
  }

  getAuthUsername() {
    return this.username.asObservable();
  }

  getAuthFullname() {
    return this.fullName.asObservable();
  }

  getAuthUserRole() {
    return this.userRole.asObservable();
  }

  private checkLoginStatus() {
    let loginStatus = sessionStorage.getItem('loginStatus');
    return loginStatus == '1';
  }

  logout() {
    this.setState({ loggedInStatus: false }, "LOGGED_IN_STATUS")
    sessionStorage.removeItem('loginStatus');
  }

}
