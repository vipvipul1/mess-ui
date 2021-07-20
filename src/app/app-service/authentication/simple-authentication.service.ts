import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from 'src/app/app.constants';
import { User } from 'src/app/app-model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  checkAuthCredentials(username, password) {
    return this.http.post(`${API_URL}/mess/login/user`, { 'username': username, 'password': password })
      .pipe(
        map(
          (data: User) => {
            if (data != null) {
              sessionStorage.setItem('user', JSON.stringify(data));
              return data;
            }
            return data;
          })
      );
  }

  getAuthenticatedUsername() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user != null ? user.username : null;
  }

  getAuthenticatedFullname() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user != null ? user.name : null;
  }

  isUserLoggedIn() {
    if (this.getAuthenticatedUsername()) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('user');
  }

}
