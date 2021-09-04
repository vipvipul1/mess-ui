import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MessDepositService {

  constructor(
    private http: HttpClient
  ) { }

  getMessDeposits(username, month, year) {
    return this.http.get(`${API_URL}/mess/deposit/viewDeposit/${username}/${month}/${year}`);
  }
}
