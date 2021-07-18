import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from 'src/app/app.constants';
import { User } from 'src/app/app-model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService {

  private user = new User();

  constructor(
    private http: HttpClient
  ) { }

  checkAuthCredentials(username, password) {
    return this.http.post(`${API_URL}/mess/login/user`, { 'username': username, 'password': password })
      .pipe(
        map(
          (data: User) => {
            if (data != null) {
              sessionStorage.setItem('username', data.username);
              this.user = data;
              return data;
            }
            return data;
          })
      );
  }

  getAuthenticatedUsername() {
    return sessionStorage.getItem('username');
  }

  getAuthenticatedFullname() {
    return this.user.name;
  }

  isUserLoggedIn() {
    if (this.getAuthenticatedUsername()) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('username');
    this.user = new User();
  }

}
