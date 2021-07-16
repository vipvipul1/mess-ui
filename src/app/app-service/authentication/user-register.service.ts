import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/app-model/user.model';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(
    private http: HttpClient
  ) { }

  registerNewUser(user: User) {
    return this.http.post<any>(`${API_URL}/mess/register/user`, user);
  }

  validateRegDetails(userDetail) {
    return this.http.get<any>(`${API_URL}/mess/register/user/validate/${userDetail}`);
  }
}
