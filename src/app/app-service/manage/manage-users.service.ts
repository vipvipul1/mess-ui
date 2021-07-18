import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/app-model/user.model';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUserDetails() {
    return this.http.get<User[]>(`${API_URL}/mess/manage/getAllUsers`);
  }

  grantOrRevokeAccess(userId, action) {
    return this.http.put(`${API_URL}/mess/manage/access/${action}`, { 'userId': userId });
  }

}
