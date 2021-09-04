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
export class SimpleAuthService extends ObservableStore<StoreState> {

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private username = sessionStorage.getItem('username');
  private fullName = sessionStorage.getItem('fullName');
  private roleId = +sessionStorage.getItem('roleId');

  constructor(
    private http: HttpClient,
  ) {
    super({ logStateChanges: false, trackStateHistory: false })
    this.loginStatus.subscribe((result) => {                      // subscription done to reflect changes to loggedInStatus state
      this.setState({ loggedInStatus: result }, 'LOGGED_IN_STATUS');// of StoreState by making changes to loginStatus at line *this.loginStatus.next(true);* of checkAuthCredentials()
    });
    if (this.username != null)
      this.setState({ username: this.username }, "LOGGED_USERNAME");
    if (this.fullName != null)
      this.setState({ fullName: this.fullName }, "LOGGED_FULL_NAME");
    if (this.roleId != null)
      this.setState({ roleId: this.roleId }, "LOGGED_ROLE_ID");
  }

  checkAuthCredentials(username, password) {
    return this.http.post(`${API_URL}/mess/login/user`, { 'username': username, 'password': password })
      .pipe(
        map(
          (data: User) => {
            if (data != null) {
              sessionStorage.setItem('loginStatus', '1');
              sessionStorage.setItem('username', data.username);
              sessionStorage.setItem('fullName', data.fullName);
              sessionStorage.setItem('roleId', String(data.roleId));
              this.loginStatus.next(true);
              this.setState({ username: data.username }, 'LOGGED_USERNAME');
              this.setState({ fullName: data.fullName }, 'LOGGED_FULL_NAME');
              this.setState({ roleId: data.roleId }, 'LOGGED_ROLE_ID');
              return data;
            }
            return data;
          })
      );
  }

  private checkLoginStatus() {
    let loginStatus = sessionStorage.getItem('loginStatus');
    return loginStatus == '1';
  }

  logout() {
    this.setState({ loggedInStatus: false }, "LOGGED_IN_STATUS")
    this.setState({ fullName: null }, "LOGGED_USERNAME")
    this.setState({ username: null }, "LOGGED_FULL_NAME")
    this.setState({ roleId: null }, "LOGGED_ROLE_ID")
    sessionStorage.removeItem('loginStatus');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('fullName');
    sessionStorage.removeItem('roleId');
  }

}
