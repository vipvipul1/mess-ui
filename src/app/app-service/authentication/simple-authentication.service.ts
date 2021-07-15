import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  checkAuthCredentials(username, password) {
    return this.http.post(`${API_URL}/mess/login/user`, {'username': username, 'password': password})
      .pipe(
        map(
          data => {
            if (data == true) {
              sessionStorage.setItem('username', username);
              return data;
            }
            return data;
          })
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('username');
  }

  isUserLoggedIn() {
    if (this.getAuthenticatedUser()) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('username');
  }

}
